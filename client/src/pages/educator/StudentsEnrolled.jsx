import { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";
const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between p-4 md:p-8 pt-8 pb-0'>
      <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
        <table className='table-fixed md:table-auto w-full overflow-hidden pb-4'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
            <tr>
              <th className='px-4 py-2 font-semibold text-center hidden sm:table-cell'>
                #
              </th>
              <th className='px-4 py-2 font-semibold'>Student Name</th>
              <th className='px-4 py-2 font-semibold '>Course Title</th>
              <th className='px-4 py-2 font-semibold hidden sm:table-cell'>
                Date
              </th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-500'>
            {enrolledStudents.map((student, index) => (
              <tr key={index} className='border-b border-gray-500/20'>
                <td className='px-4 py-2 text-center hidden sm:table-cell'>
                  {index + 1}
                </td>
                <td className='px-4 py-2 flex items-center space-x-3'>
                  <img
                    src={student.student.imageUrl}
                    alt='student_img'
                    className='w-10 h-10 rounded-full'
                  />

                  <span className='truncate'> {student.student.name}</span>
                </td>
                <td className='px-4 py-2 truncate'>{student.courseTitle}</td>
                <td className='px-4 py-2 hidden sm:table-cell'>
                  {new Date(student.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading></Loading>
  );
};

export default StudentsEnrolled;
