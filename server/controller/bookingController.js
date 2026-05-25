import booking from "../models/Booking.js";
import Car from "../models/car.js";
import Stripe from "stripe";

//function to check Availability of car for given date
const checkAvailiability = async (car, pickupDate, returnDate) => {
  const bookings = await booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $lte: pickupDate },
  });
  return bookings.length == 0;
};

//APi to check Availiability  of car for the given Date and Location

export const checkAvailiabilityofCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    //fetch all availiable cars for the given location
    const cars = await Car.find({ location, isAvaliable: true });

    //check car availiability for the given date range using promise
    const availiabileCarPromises = cars.map(async (car) => {
      const isAvaliable = await checkAvailiability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvaliable: isAvaliable };
    });

    let availableCars = await Promise.all(availiabileCarPromises);
    availableCars = availableCars.filter((car) => car.isAvaliable === true);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
//API to create booking

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvaliable = await checkAvailiability(car, pickupDate, returnDate);
    if (!isAvaliable) {
      return res.json({ success: false, message: "Car is not available" });
    }
    const carData = await Car.findById(car);
    if (!carData) {
      return res.json({ success: false, message: "Car not found" });
    }
    if (carData.owner.toString() === _id.toString()) {
      return res.json({ success: false, message: "You cannot book your own car" });
    }

    //calculate price based on pickupdate an returndate
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    await booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({ success: true, message: "Booking Created" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to create Stripe checkout session
export const createCheckoutSession = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvaliable = await checkAvailiability(car, pickupDate, returnDate);
    if (!isAvaliable) {
      return res.json({ success: false, message: "Car is not available" });
    }
    const carData = await Car.findById(car);
    if (!carData) {
      return res.json({ success: false, message: "Car not found" });
    }
    if (carData.owner.toString() === _id.toString()) {
      return res.json({ success: false, message: "You cannot book your own car" });
    }

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

    const origin = req.headers.origin || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${carData.brand} ${carData.model} Booking`,
              description: `From ${pickupDate} to ${returnDate}`,
            },
            unit_amount: price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&car=${car}&pickupDate=${pickupDate}&returnDate=${returnDate}`,
      cancel_url: `${origin}/car-details/${car}`,
    });

    res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to list user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await booking
      .find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to get owner bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const bookings = await booking
      .find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to change the booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const bookingDoc = await booking.findById(bookingId);

    if (!bookingDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (bookingDoc.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    bookingDoc.status = status;
    await bookingDoc.save();

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId } = req.body;

    const bookingDoc = await booking.findById(bookingId);

    if (!bookingDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (bookingDoc.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await booking.findByIdAndDelete(bookingId);

    res.json({ success: true, message: "Booking Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
