import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletecontact, getallcontacts } from '@/Store/AdminSlice/ContactSlice';
import { Button } from '@/components/ui/button';

function AttendeeInfo() {
  const dispatch = useDispatch();

  const { contacts } = useSelector((state) => state.contact);

  const handleondelete = (id) => {
    dispatch(deletecontact(id));
    dispatch(getallcontacts());
  };

  useEffect(() => {
    dispatch(getallcontacts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendee Contacts</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white border-collapse border shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">ID</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Name</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Email</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Phone</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Message</th>
              <th className="border text-xs sm:text-sm border-gray-300 px-2 sm:px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts && contacts.length > 0 ? (
              contacts.map((contact, i) => (
                <tr key={i} className="hover:bg-gray-50 text-center">
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    {`${String(i + 101).padStart(3, '0')}`} {/* ID starts from 101 */}
                  </td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">{contact.name}</td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">{contact.email}</td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">{contact.phone}</td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">{contact.message}</td>
                  <td className="border text-xs sm:text-sm text-gray-500 font-bold border-gray-300 px-2 sm:px-4 py-2">
                    <Button
                      onClick={() => handleondelete(contact._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border text-center py-4 text-gray-500"
                >
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendeeInfo;
