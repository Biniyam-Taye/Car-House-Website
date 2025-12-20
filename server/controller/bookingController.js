import booking from "../models/Booking.js";
import Car from "../models/car.js";

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
