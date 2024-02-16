import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import Listing from '../models/listing.model.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ApiError('Listing not found', 404));
    }

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    let {
      query,
      skip = 0,
      limit = 9,
      furnished,
      parking,
      type,
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    if (!parking) {
      parking = { $in: [true, false] };
    }
    if (!furnished) {
      furnished = { $in: [true, false] };
    }
    if (!type || type === 'all') {
      type = { $in: ['rent', 'sell'] };
    }

    const listings = await Listing.find({
      $or: [
        { name: { $regex: query || '', $options: 'i' } },
        { description: { $regex: query || '', $options: 'i' } },
        { address: { $regex: query || '', $options: 'i' } },
      ],
      furnished,
      parking,
      type,
    })
      .skip(+skip)
      .limit(+limit)
      .sort({ [sort]: order });

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ApiError('User not found', 404));
    }

    const listings = await Listing.find({ userRef: req.params.id });

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const isListing = await Listing.findById(req.params.id);
    if (!isListing) {
      return next(new ApiError('Listing not found', 404));
    }

    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const isListing = await Listing.findById(req.params.id);
    if (!isListing) {
      return next(new ApiError('Listing not found', 404));
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
