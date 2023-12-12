import "antd/dist/antd.variable.min.css";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Spin } from "antd";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import AuthRoutes from "./routes/AuthRoutes";

import NotFoundPage from "./pages/ErrorPages/NotFoundPage";
import Theme from "./theme";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Bookings, { BookingInfo } from "./pages/Bookings";
import Clients, { ClientInfo } from "./pages/Clients";
import ServiceProviders, {
  ServiceProviderInfo,
} from "./pages/ServiceProviders";
import PaymentMethods from "./pages/PaymentMethods";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import ProductCategories from "./pages/ServiceCategory/ProductCategories";
import Products from "./pages/Product/Products";
import CreateProduct from "./pages/Product/CreateProduct";
import ProductDetails from "./pages/Product/ProductDetails";
import EditProduct from "./pages/Product/EditProduct";
import VarietyBoxes from "./pages/VarietyBox/VarietyBoxes";
import CreateVarietyBox from "./pages/VarietyBox/CreateVarietyBox";
import VarietyBoxDetails from "./pages/VarietyBox/VarietyBoxDetails";
import EditVarietyBox from "./pages/VarietyBox/EditVarietyBox";
import CountdownTimer from "./pages/Groups/CountdownTimer";
import Groups from "./pages/Groups/Groups";
import GroupDetail from "./pages/Groups/GroupDetail";
import Customers from "./pages/Customers/Customers";
import CustomerDetail from "./pages/Customers/CustomerDetail";

import Activities from "./pages/Activity/Activities";
import CreateGlobalActivity from "./pages/Activity/CreateGlobalActivity";
import ActivityDetails from "./pages/Activity/ActivityDetails";
import Subjects from "./pages/Subjects/Subjects";
import Learnerclasses from "./pages/Learnerclasses/Learnerclasses";
import LearnerAges from "./pages/LearnerAges/LearnerAges";
import Courses from "./pages/course/Courses";
import CreateCourse from "./pages/course/CreateCourse";
import CourseDetail from "./pages/course/CourseDetail";
import Categories from "./pages/Category/Categories";
import Companies from "./pages/Company/Companies";
import Insurances from "./pages/Insurance/Insurances";
import InsuranceDetail from "./pages/Insurance/InsuranceDetail";
import CompanyDetails from "./pages/Company/CompanyDetails";
import Lessons from "./pages/Lesson/Lessons";
import LessonDetails from "./pages/Lesson/LessonDetails";
import Claims from "./pages/Claim/Claims";
import ClaimDetails from "./pages/Claim/ClaimDetails";
import Users from "./pages/Users/ListUsers";
import UserDetails from "./pages/Users/UserDetails";
import ListUsers from "./pages/Users/ListUsers";
import ListOrders from "./pages/Orders/ListOrders";
import OrderDetails from "./pages/Orders/OrderDetails";
import ListPayments from "./pages/Payments/ListPayments";
import PaymentDetails from "./pages/Payments/PaymentDetails";
import ListContacts from "./pages/ContactSupport/ListContacts";
import Notifications from "./pages/Notification/Notifications";

import SupportDetails from "./pages/ContactSupport/SupportDetails";
import ListTopup from "./pages/TopUp/ListTopup";
import TopupDetails from "./pages/TopUp/TopupDetails";
import Jobs from "./pages/Jobs/Jobs";
import JobDetails from "./pages/Jobs/JobDetails";
import Wallet from "./pages/Wallet";
import WalletDetails from "./pages/Wallet/WalletDetails";
import Admins from "./pages/SubAdmin/Admins";
import ListRiders from "./pages/Riders/ListRiders";
import RiderDetails from "./pages/Riders/RiderDetails";
import ListPickupCharges from "./pages/PickupCharges.js/ListPickupCharges";
import ListHubLocations from "./pages/Locations/ListLocations";
import ListPricingParameters from "./pages/PricingParameters/ListPricingParameters";
import Chats from "./pages/Chats/Chats";
import NotificationDetails from "./pages/Notification/NotficationDetails";
import CategoryDetails from "./pages/Category/CategoryDetails";
import Bands from "./pages/Bands/Bands";
import BandDetails from "./pages/Bands/BandDetails";
import Coupons from "./pages/Coupons/Coupons";
import CouponDetails from "./pages/Coupons/CouponDetails";
import DeliveryLocations from "./pages/DeliveryLocation/DeliveryLocations";
import DeliveryLocationDetails from "./pages/DeliveryLocation/DeliveryLocationDetails";
import ListLocations from "./pages/Locations/ListLocations";
import ListSpecialRequests from "./pages/SpecialRequests/ListSpecialRequests";
import SpecialRequestDetails from "./pages/SpecialRequests/SpecialRequestDetails";
import TimeSlots from "./pages/TimeSlot/TimeSlots";
import TimeSlotDetails from "./pages/TimeSlot/TimeSlotDetails";
import SiteData from "./pages/SiteData/SiteData";
import QuickGuides from "./pages/QuickGuide/QuickGuides";
import Setting from "./pages/Setting/Setting";
// import Settings from "./pages/Settings";

const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));

const Loading = () => {
  return (
    <div className="spin">
      <Spin />
    </div>
  );
};

Theme();

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/create-account" element={<Signup />} />

          {/* Auth routes */}
          <Route path="/" element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/reset-confirmation" element={<ResetPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Private routes  */}
          <Route path="/" element={<ProtectedRoutes />}>
            {/* Other protected pages */}
            <Route
              //
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              //
              path="/bookings"
              element={<Bookings />}
            />
            {/* <Route
              //
              path='/bookings/:id'
              element={<BookingInfo />}
            /> */}
            <Route
              //
              path="/clients"
              element={<Clients />}
            />
            <Route
              //
              path="/clients/:id"
              element={<ClientInfo />}
            />
            <Route
              //
              path="/product-categories"
              element={<ProductCategories />}
            />
            <Route
              //
              path="/service-provider/:id"
              element={<ServiceProviderInfo />}
            />
            <Route
              //
              path="/service-provider"
              element={<ServiceProviders />}
            />
            <Route
              //
              path="/payment-method"
              element={<PaymentMethods />}
            />
            <Route
              //
              path="/transactions"
              element={<Transactions />}
            />
            <Route
              //
              path="/wallet"
              element={<Wallet />}
            />

            <Route
              //
              path="/wallet/details/:id"
              element={<WalletDetails />}
            />
            <Route
              //
              path="/settings"
              element={<Settings />}
            />
            <Route path="products" element={<Products />} />
            <Route path="product/create" element={<CreateProduct />} />
            <Route
              //
              path="/product/details/:id/:refkey"
              element={<ProductDetails />}
            />
            <Route
              //
              path="/product/edit/:id/:refkey"
              element={<EditProduct />}
            />
            {/* VarietyBoxes */}
            <Route path="variety-Boxes" element={<VarietyBoxes />} />
            <Route path="variety-Box/create" element={<CreateVarietyBox />} />
            <Route
              //
              path="/variety-box/details/:id/:refkey"
              element={<VarietyBoxDetails />}
            />
            <Route
              //
              path="/variety-box/edit/:id/:refkey"
              element={<EditVarietyBox />}
            />
            <Route
              //
              path="/timer-countdown"
              element={<CountdownTimer />}
            />
            <Route path="groups" element={<Groups />} />
            <Route
              //
              path="/group/details/:id"
              element={<GroupDetail />}
            />

            <Route
              //
              path="/customers"
              element={<Customers />}
            />
            <Route
              //
              path="/customer/details/:id/:email"
              element={<CustomerDetail />}
            />

            <Route path="activities" element={<Activities />} />
            <Route
              path="activity/global/create"
              element={<CreateGlobalActivity />}
            />
            <Route
              //
              path="/activity/details/:id"
              element={<ActivityDetails />}
            />
            <Route
              //
              path="/product/edit/:id/:refkey"
              element={<EditProduct />}
            />
            {/* subject */}
            <Route path="subjects" element={<Subjects />} />
            <Route path="learner-classes" element={<Learnerclasses />} />
            <Route path="learner-ages" element={<LearnerAges />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/create" element={<CreateCourse />} />
            <Route
              path="/course/details/:id/:title_slug"
              element={<CourseDetail />}
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/details/:id" element={<CategoryDetails />} />

            <Route path="/sitedata" element={<SiteData />} />


            <Route path="/bands" element={<Bands/>} />
            <Route path="/bands/details/:id" element={<BandDetails />} />

            <Route path="/time-slots" element={<TimeSlots/>} />
            <Route path="/time-slots/details/:id" element={<TimeSlotDetails />} />

            <Route path="/delivery" element={<DeliveryLocations/>} />
            <Route path="/delivery/details/:id" element={<DeliveryLocationDetails />} />

            <Route path="/coupons" element={<Coupons/>} />
            <Route path="/coupons/details/:id" element={<CouponDetails />} />

            <Route path="/companies" element={<Companies />} />
            <Route
              path="/company/details/:id/:slug"
              element={<CompanyDetails />}
            />

            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/details/:id/:slug" element={<JobDetails />} />

            <Route path="insurances" element={<Insurances />} />
            <Route
              path="/insurance/details/:id/:slug"
              element={<InsuranceDetail />}
            />
            <Route path="products" element={<Products />} />
            <Route
              path="/product/details/:id/:slug"
              element={<ProductDetails />}
            />
            <Route path="lessons" element={<Lessons />} />
            <Route
              path="/lesson/details/:id/:slug"
              element={<LessonDetails />}
            />

            <Route path="claims" element={<Claims />} />
            <Route path="/claim/details/:id/:slug" element={<ClaimDetails />} />

            <Route path="chats" element={<Chats />} />

            <Route path="orders" element={<ListOrders />} />
            <Route path="/order/details/:id" element={<OrderDetails />} />

            <Route path="special-requests" element={<ListSpecialRequests />} />
            <Route path="/special-requests/details/:id" element={<SpecialRequestDetails />} />

            <Route path="users" element={<ListUsers />} />
            <Route path="/user/details/:id/:email" element={<UserDetails />} />

            <Route path="riders" element={<ListRiders />} />
            <Route path="/rider/details/:id" element={<RiderDetails />} />
            <Route path="topup" element={<ListTopup />} />
            <Route path="/topup/details/:id/" element={<TopupDetails />} />
            <Route path="payments" element={<ListPayments />} />
            <Route
              path="/payment/details/:id/:ref"
              element={<PaymentDetails />}
            />
            <Route path="contacts" element={<ListContacts />} />
            <Route path="/contacts/details/:id" element={<SupportDetails />} />

            <Route path="notifications" element={<Notifications />} />
            <Route
              path="/notification/details/:id"
              element={<NotificationDetails />}
            />

            <Route path="quickguide" element={<QuickGuides />} />
            <Route path="/pickupcharge" element={<ListPickupCharges />} />
            <Route path="/locations" element={<ListLocations />} />
            <Route path="/setting" element={<Setting />} />

            <Route
              path="/pricing-parameters"
              element={<ListPricingParameters />}
            />

            <Route path="admins" element={<Admins />} />
          </Route>

          {/* Catch all routes -> push to not found page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
