import expressAsyncHandler from "express-async-handler";
import express from "express";
const Account = require("../models/account");
import User from "../models/user";

// @desc    Get all accounts
// @route   GET /api/accounts
// @access  Private
export const getAccounts = expressAsyncHandler(
  async (_req: express.Request, res: express.Response) => {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  }
);

// @desc   add account and add account to user
// @route  Post /api/newAccount
// @access Private
export const addAccount = expressAsyncHandler(
  async (req: express.Request, res: express.Response) => {
    const account = await Account.create(req.body);
    const user = await User.findById(req.body.user);
    user.accounts.push(account._id);
    await user.save();
    res.status(201).json(account);
  }
);

// @desc   Get account by id
// @route  GET /api/accounts/:id
// @access Private
export const getAccount = expressAsyncHandler(
  async (req: express.Request, res: express.Response) => {
    const account = await Account.findById(req.params.id);
    res.status(200).json(account);
  }
);

// @desc   Update account
// @route  PUT /api/accounts/:id
// @access Private
export const updateAccount = expressAsyncHandler(
  async (req: express.Request, res: express.Response) => {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(account);
  }
);

// @desc   Delete account
// @route  DELETE /api/accounts/:id
// @access Private
export const deleteAccount = expressAsyncHandler(
  async (req: express.Request, res: express.Response) => {
    await Account.findByIdAndDelete(req.params.id);
    res.status(204).json(req.params.id);
  }
);

// @desc   transfer money to another account
// @route  PUT /api/accounts/:id/transfer
// @access Private

// @desc   Get accounts by user id (for user dashboard)
// @route  GET /api/accounts/user/:id
// @access Private
export const getAccountsByUserId = expressAsyncHandler(
  async (req: express.Request, res: express.Response) => {
    const accounts = await Account.find({ user: req.params.id });
    res.status(200).json(accounts);
  }
);





