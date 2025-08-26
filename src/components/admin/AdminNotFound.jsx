import { Link } from 'react-router-dom';

const AdminNotFound = () => {
  return (
    <div className="admin-404">
      <h2>Admin Resource Not Found</h2>
      <p>Return to <Link to="/admin/home/dashboard">Dashboard</Link></p>
    </div>
  );
};
export default AdminNotFound
