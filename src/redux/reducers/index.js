import { combineReducers } from "@reduxjs/toolkit";
import auth from "../authSlice";
import app from "../appSlice";
import bookings from "../bookingSlice";
import clients from "../clientSlice";
import serviceCategory from "../serviceCategorySlice";
import serviceProviders from "../serviceProviderSlice";
import paymentMethods from "../paymentMethodSlice";
import transactions from "../transactionSlice";
import profile from "../profileSlice";
import products from "../productSlice";
import varietyBoxes from "../varietyBoxSlice";
import groups from "../groupSlice";
import customers from "../customerSlice";
import activities from "../activitySlice";
import subjects from "../subjectSlice";
import learnerClasses from "../LearnerClassSlice";
import learnerAges from "../LearnerAgeSlice";
import courses from "../courseSlice";
import categories from "../categorySlice";
import companies from "../companySlice";
import insurances from "../InsuranceSlice";
import lessons from "../lessonSlice";
import claims from "../claimSlice";
import users from "../userSlice";
import buyers from "../buyerSlice";
import sellers from "../sellerSlice";
import both from "../bothSlice";
import orders from "../orderSlice";
import payments from "../paymentSlice";
import contacts from "../supportSlice";
import notifications from "../notificationSlice";
import banners from "../bannerSlice";
import top from "../topRatedProductSlice";
import topup from "../topupSlice";
import jobs from "../jobSlice";
import featuredJobs from "../featuredJobSlice";
import wallet from "../walletSlice";
import admin from "../adminSlice";
import rider from "../riderSlice";
import pickup from "../pickupchargeSlice";
import location from "../locationSlice";
import pricing from "../pricingparameterSlice";
import chat from "../chatSlice";
import band from '../bandSlice'
import coupon from '../couponSlice'
import deliveryLocation from '../deliveryLocationSlice'


const rootReducer = combineReducers({
  auth,
  app,
  bookings,
  clients,
  serviceCategory,
  serviceProviders,
  paymentMethods,
  transactions,
  profile,
  products,
  varietyBoxes,
  groups,
  customers,
  activities,
  subjects,
  learnerClasses,
  learnerAges,
  courses,
  categories,
  companies,
  insurances,
  lessons,
  claims,
  users,
  orders,
  payments,
  contacts,
  notifications,
  banners,
  buyers,
  sellers,
  both,
  top,
  topup,
  jobs,
  featuredJobs,
  wallet,
  admin,
  rider,
  pickup,
  location,
  pricing,
  chat,
  band, coupon, deliveryLocation
});

export default rootReducer;
