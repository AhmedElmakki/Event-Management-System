// src/pages/ManageUsers.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import searchIcon from "../materials/search icon.svg";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  // Fetch all users or filtered by search
  const fetchUsers = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users${query ? `?search=${query}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    fetchUsers(searchQuery.trim());
  };

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditedValues({
      username: user.username,
      name: user.name,
      email: user.email,
      agegroup: user.agegroup,
      gender: user.gender,
      country: user.country,
      role: user.role,
      interest: user.interest || "",
    });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditedValues({});
  };

  const saveEditing = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedValues),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updatedUser = await res.json();
      setUsers(users.map(u => (u._id === id ? updatedUser : u)));
      setEditingUserId(null);
      setEditedValues({});
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading users...</p>;

  return (
    <div className="global-body">
      <div className="board">
        <Sidebar />
        <div className="main-content">
          {/* Search */}
          <div className="search" style={{ marginBottom: "20px" }}>
            <div className="searcharea" style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="search-button" onClick={handleSearch}>
                <img src={searchIcon} alt="search" />
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="dashboard-card" style={{ padding: "20px", overflowX: "auto", height:"auto"}}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age Group</th>
                  <th>Gender</th>
                  <th>Country</th>
                  <th>Role</th>
                  <th>Interest</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    {/** Inline editing inputs for text fields */}
                    {["username", "name", "email"].map((field) => (
                      <td key={field}>
                        {editingUserId === user._id ? (
                          <input
                            value={editedValues[field]}
                            onChange={e => setEditedValues({ ...editedValues, [field]: e.target.value })}
                          />
                        ) : (
                          user[field] || "-"
                        )}
                      </td>
                    ))}

                    {/** Age group as a select */}
                      <td>
                        {editingUserId === user._id ? (
                          <select
                            value={editedValues.agegroup || ""}
                            onChange={e => setEditedValues({ ...editedValues, agegroup: e.target.value })}
                          >
                            {/* Add your age group options here */}
                            <option value="18-24">18 to 24</option>
                            <option value="25-34">25 to 34</option>
                            <option value="35-44">35 to 44</option>
                            <option value="45+">45+</option>
                          </select>
                        ) : (
                          user.agegroup || "-"
                        )}
                      </td>



                      {/** Gender */}
                      <td>
                        {editingUserId === user._id ? (
                          <select
                            value={editedValues.gender}
                            onChange={e => setEditedValues({ ...editedValues, gender: e.target.value })}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        ) : (
                          user.gender
                        )}
                      </td>

                      {/** Country */}
                      <td>
                      {editingUserId === user._id ? (
                        <select
                          value={editedValues.country || ""}
                          onChange={e => setEditedValues({ ...editedValues, country: e.target.value })}
                        >
                          {/* Add your country options here */}
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Brunei">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cabo Verde">Cabo Verde</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Eswatini">Eswatini</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Greece">Greece</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Laos">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">Micronesia</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="North Korea">North Korea</option>
                            <option value="North Macedonia">North Macedonia</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestine">Palestine</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Korea">South Korea</option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-Leste">Timor-Leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Vatican City">Vatican City</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>

                        </select>
                      ) : (
                        user.country || "-"
                      )}
                    </td>

                      {/** Role */}
                      <td>
                        {editingUserId === user._id ? (
                          <select
                            value={editedValues.role}
                            onChange={e => setEditedValues({ ...editedValues, role: e.target.value })}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          user.role
                        )}
                      </td>

                      {/* Interest */}
                        <td>
                          {editingUserId === user._id ? (
                            <select
                              value={editedValues.interest || ""}
                              onChange={e =>
                                setEditedValues({ ...editedValues, interest: e.target.value })
                              }
                            >
                              <option value="">-- Select Interest --</option>
                              <option value="Science and Technology">Science and Technology</option>
                              <option value="Biology and Chemistry">Biology and Chemistry</option>
                              <option value="Business and Innovation">Business and Innovation</option>
                              <option value="Entrepreneurship">Entrepreneurship</option>
                              <option value="Video Games and Entertainment">Video Games and Entertainment</option>
                              <option value="Everything">Everything</option>
                              <option value="None">None</option>
                            </select>
                          ) : (
                            user.interest || "-"
                          )}
                        </td>

                      {/** Actions */}
                      <td>
                        {editingUserId === user._id ? (
                          <>
                          <button className="action-btn save-btn" onClick={() => saveEditing(user._id)}>Save</button>
                          <button className="action-btn cancel-btn" onClick={cancelEditing}>Cancel</button>
                          </>
                        ) : (
                          <button className="action-btn edit-btn" onClick={() => startEditing(user)}>Edit</button>
                        )}
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && <p style={{ textAlign: "center" }}>No users found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
