import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Card, Badge } from 'react-bootstrap';
import { FaUserPlus, FaEdit, FaTrash, FaUserMd, FaUserNurse } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    specialty: '',
    password: '',
    status: 'active'
  });

  const getRoleBadgeVariant = (role) => {
    const variants = {
      'Doctor': 'primary',
      'Admin': 'danger',
      'Nurse': 'success',
      'Receptionist': 'info'
    };
    return variants[role] || 'secondary';
  };

  // Modal handlers
  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      role: '',
      specialty: '',
      password: '',
      status: 'active'
    });
  };

  const handleShow = () => setShowModal(true);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data);
      } else {
        console.error('Error fetching users:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editMode 
        ? `http://localhost:5000/api/users/${currentUser.id}`
        : 'http://localhost:5000/api/users';
      
      const response = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: currentUser.name,
          email: currentUser.email,
          password: currentUser.password,
          role: currentUser.role,
          specialty: currentUser.specialty,
          status: currentUser.status
        })
      });

      const data = await response.json();
      
      if (data.success) {
        fetchUsers(); // Refresh the users list
        handleClose();
      } else {
        alert(data.message || 'Error al procesar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        if (data.success) {
          fetchUsers(); // Refresh the users list
        } else {
          alert(data.message || 'Error al eliminar usuario');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar usuario');
      }
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setEditMode(true);
    setShowModal(true);
  };


  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Staff Management</h2>
            <p className="text-muted mb-0">Manage clinic staff and their roles</p>
          </div>
          <Button 
            variant="primary" 
            onClick={handleShow}
            className="d-flex align-items-center gap-2"
          >
            <FaUserPlus />
            Add New Staff Member
          </Button>
        </div>

        <Table striped bordered hover responsive className="align-middle">
          <thead className="bg-light">
            <tr>
              <th>Staff Member</th>
              <th>Role & Specialty</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="d-flex align-items-center">
                    {user.role === 'Doctor' ? <FaUserMd className="me-2 text-primary"/> : 
                     user.role === 'Nurse' ? <FaUserNurse className="me-2 text-success"/> : 
                     null}
                    <div>
                      <div className="fw-bold">{user.username}</div>
                      <small className="text-muted">{user.id}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge bg={getRoleBadgeVariant(user.role)} className="me-2">
                    {user.role}
                  </Badge>
                  <small className="text-muted d-block">{user.specialty}</small>
                </td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={user.status === 'active' ? 'success' : 'warning'}>
                    {user.status}
                  </Badge>
                </td>
                <td>
                  <Button 
                    variant="outline-info" 
                    size="sm" 
                    className="me-2" 
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton className="bg-light">
            <Modal.Title>{editMode ? 'Edit Staff Member' : 'Add New Staff Member'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={currentUser.name || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={currentUser.email || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              {!editMode && (
                <div className="row">
                  <div className="col-md-12">
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={currentUser.password || ''}
                        onChange={handleInputChange}
                        required={!editMode}
                      />
                    </Form.Group>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={currentUser.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Admin">Administrator</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Receptionist">Receptionist</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Specialty</Form.Label>
                    <Form.Control
                      type="text"
                      name="specialty"
                      value={currentUser.specialty}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="outline-secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editMode ? 'Update Staff Member' : 'Add Staff Member'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default Users;