import { Dialog } from '@/components/ui/dialog';
import { deletexhibitors, getallexhibitors } from '@/Store/AdminSlice/ExhibitorSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ExhibitorDetailDialog from './ExhibitorDetailDialog';
import { Button } from '@/components/ui/button';

function ExhibitorList() {

  const [opendetaildialog, setopendetaildialog] = useState({});
  const { isloading, exhibitors } = useSelector((state) => state.exhibitors);
  const dispatch = useDispatch();

  const handleondelete = (id) => {
    dispatch(deletexhibitors(id)).then((res) => {
      dispatch(getallexhibitors());
      if (res.payload.sucess) {
        Swal.fire({
          icon: 'success',
          title: res.payload.status,
          text: res.payload.message,
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  const toggledialog = (id) => {
    setopendetaildialog((prevstate) => ({
      ...prevstate,
      [id]: !prevstate[id],
    }));
  };

  useEffect(() => {
    dispatch(getallexhibitors());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Exhibitors List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white border-collapse border shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="border text-sm border-gray-300 px-4 py-2">Name</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Email</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Company Name</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Logo</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Show</th>
            </tr>
          </thead>
          <tbody>
            {exhibitors && exhibitors.length ? (
              exhibitors.map((exhibit, i) => (
                <tr key={i} className="hover:bg-gray-50 text-center">
                  <td className="border text-sm text-gray-500 font-bold border-gray-300 px-4 py-2">
                    {exhibit.name}
                  </td>
                  <td className="border text-sm text-gray-500 font-bold border-gray-300 px-4 py-2">
                    {exhibit.email}
                  </td>
                  <td className="border text-sm text-gray-500 font-bold border-gray-300 px-4 py-2">
                    {exhibit.companyName}
                  </td>
                  <td className="border text-sm text-gray-500 font-bold border-gray-300 px-4 py-2">
                    {exhibit.logo ? (
                      <img
                        src={exhibit.logo}
                        alt="Logo"
                        className="w-12 h-12 object-cover mx-auto"
                      />
                    ) : (
                      "No Logo"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Dialog open={opendetaildialog[exhibit._id]} onOpenChange={() => toggledialog(exhibit._id)}>
                      <ExhibitorDetailDialog exhibit={exhibit} handleondelete={handleondelete} />
                    </Dialog>
                    <Button
                      className="text-xs md:text-sm px-4 py-2"
                      onClick={() => toggledialog(exhibit._id)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">
                  No exhibitors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExhibitorList;
