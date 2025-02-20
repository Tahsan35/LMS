import { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { unstable_setDevServerHooks } from "react-router-dom";
const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const fetchDashboard = async () => {
    setDashboard(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return dashboard ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 p-4 pt-8 pb-0 md:p-8 md:pb-0'>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-2 shadow-card border-blue-500 p-4 w-54 rounded-md'>
            <img src={assets.patients_icon} alt='patient icon' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {dashboard.enrolledStudentsData.length}
              </p>
              <p className='text-base text-gray-500'>Total Enrollments</p>
            </div>
          </div>
          <div className='flex items-center gap-2 shadow-card border-blue-500 p-4 w-54 rounded-md'>
            <img src={assets.appointments_icon} alt='appointment icon' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {dashboard.totalCourses}
              </p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>
          <div className='flex items-center gap-2 shadow-card border-blue-500 p-4 w-54 rounded-md'>
            <img src={assets.earning_icon} alt='earning icon' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {dashboard.totalEarnings}
              </p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className='pb-4 text-lg font-medium'>Latest Enrollments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500'>
            <table>
              <thead></thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
