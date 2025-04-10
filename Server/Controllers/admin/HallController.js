import Hall from "../../Model/HallModel.js";

// Create a new Hall
const createHall = async (req, res) => {
  try {
    const {
      HallId,
      HotelName,
      HallDescription,
      HallNumber,
      HallFloor,
      HallSize,
      NoOfStalls,
      NoOfEntrances,
      SeatingCapacity,
      HallType,
      Facilities,
      AccessibilityFeatures,
      BookingPrice,
      Location,
    } = req.body;

    if (
      !HallId ||
      !HotelName ||
      !HallDescription ||
      !HallNumber ||
      !HallFloor ||
      !HallSize ||
      !NoOfStalls ||
      !NoOfEntrances ||
      !SeatingCapacity ||
      !HallType ||
      !Facilities ||
      !AccessibilityFeatures ||
      !BookingPrice ||
      !Location
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Create Hall
    const newHall = await Hall.create({
      HallId,
      HotelName,
      HallDescription,
      HallNumber,
      HallFloor,
      HallSize,
      NoOfStalls,
      NoOfEntrances,
      SeatingCapacity,
      HallType,
      Facilities,
      AccessibilityFeatures,
      BookingPrice,
      Location,
    });

    return res.status(201).json({
      success: true,
      message: "Hall created successfully",
      data: newHall,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating Hall",
    });
  }
};

// Get all Halls
const getAllHalls = async (req, res) => {
  try {
    const halls = await Hall.find();
    return res.status(200).json({
      success: true,
      message: "Halls fetched successfully",
      data: {
        count: halls.length,
        halls,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching halls",
    });
  }
};

// Get a single Hall by ID
const getHallById = async (req, res) => {
  try {
    const { id } = req.params;
    const hall = await Hall.findById(id);

    if (!hall) {
      return res.status(404).json({
        success: false,
        message: "Hall not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hall fetched successfully",
      data: hall,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching hall",
    });
  }
};

// Update a Hall by ID
const updateHallById = async (req, res) => {
  try {
    const updatedHall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedHall) {
      return res.status(404).json({
        success: false,
        message: "Hall not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hall updated successfully",
      data: updatedHall,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating hall",
    });
  }
};

// Delete a Hall by ID
const deleteHallById = async (req, res) => {
  try {
    const { id } = req.params;
    const hall = await Hall.findById(id);

    if (!hall) {
      return res.status(404).json({
        success: false,
        message: "Hall not found",
      });
    }

    await Hall.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Hall deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting hall",
    });
  }
};

export { createHall, getAllHalls, getHallById, updateHallById, deleteHallById };
