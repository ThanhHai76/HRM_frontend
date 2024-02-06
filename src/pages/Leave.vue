<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="breadcrumb-path">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html"
                  ><img
                    src="@/assets/img/dash.png"
                    class="mr-2"
                    alt="breadcrumb"
                  />Home</a
                >
              </li>
              <li class="breadcrumb-item active">Leave</li>
            </ul>
            <h3>Leave</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 col-sm-12 col-12 d-flex">
          <div class="card card-lists flex-fill">
            <div class="card-header">
              <h2 class="card-titles">
                Focus Technologies<span>Head Office</span>
              </h2>
              <a
                class="edit-link"
                data-toggle="modal"
                data-target="#editmember"
              >
                <i data-feather="edit"></i
              ></a>
            </div>
            <div class="card-body d-flex align-items-center">
              <div class="member-head employee-image">
                <h2>Members</h2>
                <div class="avatar-group">
                  <div class="avatar avatar-xs group_img group_header">
                    <img
                      class="avatar-img rounded-circle"
                      alt="User Image"
                      src="@/assets/img/profiles/avatar-10.jpg"
                    />
                  </div>
                  <div class="avatar avatar-xs group_img group_header">
                    <img
                      class="avatar-img rounded-circle"
                      alt="User Image"
                      src="@/assets/img/profiles/avatar-15.jpg"
                    />
                  </div>
                  <div class="avatar avatar-xs group_img group_header">
                    <img
                      class="avatar-img rounded-circle"
                      alt="User Image"
                      src="@/assets/img/profiles/avatar-16.jpg"
                    />
                  </div>
                  <div class="avatar avatar-xs group_img group_header">
                    <img
                      class="avatar-img rounded-circle"
                      alt="User Image"
                      src="@/assets/img/profiles/avatar-17.jpg"
                    />
                  </div>
                  <div class="avatar avatar-xs group_img group_header">
                    <img
                      class="avatar-img rounded-circle"
                      alt="User Image"
                      src="@/assets/img/profiles/avatar-14.jpg"
                    />
                  </div>
                  <div class="avatar avatar-xs group_img group_header">
                    <img
                      class="avatar-img rounded-circle"
                      alt="User Image"
                      src="@/assets/img/profiles/avatar-18.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="employee_status text-center">
                <img alt="User Image" src="@/assets/img/profiles/avatar-17.jpg" />
                <label>Jenni Sims is working <br />from home today.</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="employee_status text-center">
                <img alt="User Image" src="@/assets/img/profiles/avatar-18.jpg" />
                <label>John Gibbs is away today.</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">Apply Leaves</h2>
            </div>
            <div class="form-creation">
              <div class="row">
                <div class="col-xl-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Leave Type <span class="mandatory">*</span> </label>
                    <select class="select">
                      <option value="Select leave">Select leave</option>
                      <option value="leave">Casual leave</option>
                      <option value="leave">Earned leave</option>
                    </select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Remaining Leaves</label>
                    <input type="text" value="10" disabled />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label>From </label>
                    <input type="text" />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label>To</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label>Half Day <span class="mandatory">*</span> </label>
                    <select class="select">
                      <option value="Select leave">Select</option>
                      <option value="leave">Casual leave</option>
                      <option value="leave">Earned leave</option>
                    </select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label>Remaining Leaves</label>
                    <input type="text" value="2" disabled />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12 col-sm-12 col-12">
                  <div class="form-group">
                    <label>From </label>
                    <textarea rows="4" cols="50"> </textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12 col-sm-12 col-12">
                  <div class="form-btn">
                    <a href="#" class="btn btn-apply">Apply</a>
                    <a href="#" class="btn btn-secondary">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">Leave Details</h2>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table custom-table no-footer">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Total Employees</th>
                      <th>First Half</th>
                      <th>Second Half</th>
                      <th>Working From Home</th>
                      <th>Absent</th>
                      <th>Today Aways</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><label>05 May 2019 </label></td>
                      <td><label>7 </label></td>
                      <td><label>6 </label></td>
                      <td><label>6 </label></td>
                      <td><label>1 </label></td>
                      <td><label>0 </label></td>
                      <td><label>1 </label></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">Leave Details</h2>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table custom-table no-footer">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Days</th>
                      <th>Remaining Days</th>
                      <th>Notes</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="table-img">
                          <a href="profile.html"
                            ><img
                              src="@/assets/img/profiles/avatar-13.jpg"
                              alt="profile"
                              class="img-table"
                          /></a>
                          <label>Sean Black</label>
                        </div>
                      </td>
                      <td>
                        <label>Parental Leave </label>
                      </td>
                      <td>
                        <label>05 Dec 2019 </label>
                      </td>
                      <td><label>07 Dec 2019 </label></td>
                      <td><label>3</label></td>
                      <td><label>9</label></td>
                      <td><label>Parenting Leave</label></td>
                      <td>
                        <label><a class="action_label3">Approved</a></label>
                      </td>
                      <td>
                        <label
                          ><a
                            class="action_label4"
                            data-toggle="modal"
                            data-target="#delete"
                            >Delete <i data-feather="trash-2"></i> </a
                        ></label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="table-img">
                          <a href="profile.html"
                            ><img
                              src="@/assets/img/profiles/avatar-16.jpg"
                              alt="profile"
                              class="img-table"
                          /></a>
                          <label>Linda Craver</label>
                        </div>
                      </td>
                      <td>
                        <label>Parental Leave </label>
                      </td>
                      <td>
                        <label>05 Dec 2019 </label>
                      </td>
                      <td><label>07 Dec 2019 </label></td>
                      <td><label>3</label></td>
                      <td><label>9</label></td>
                      <td><label>Going to Hospital</label></td>
                      <td>
                        <label><a class="action_label3">Approved</a></label>
                      </td>
                      <td>
                        <label
                          ><a
                            class="action_label4"
                            data-toggle="modal"
                            data-target="#delete"
                            >Delete <i data-feather="trash-2"></i> </a
                        ></label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="table-img">
                          <a href="profile.html"
                            ><img
                              src="@/assets/img/profiles/avatar-17.jpg"
                              alt="profile"
                              class="img-table"
                          /></a>
                          <label>Jenni Sims</label>
                        </div>
                      </td>
                      <td>
                        <label>Parental Leave </label>
                      </td>
                      <td>
                        <label>05 Dec 2019 </label>
                      </td>
                      <td><label>07 Dec 2019 </label></td>
                      <td><label>3</label></td>
                      <td><label>9</label></td>
                      <td><label>Raining</label></td>
                      <td>
                        <label><a class="action_label3">Approved</a></label>
                      </td>
                      <td>
                        <label
                          ><a
                            class="action_label4"
                            data-toggle="modal"
                            data-target="#delete"
                            >Delete <i data-feather="trash-2"></i> </a
                        ></label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeavePage",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
