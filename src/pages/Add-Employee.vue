<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="breadcrumb-path mb-4">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
              <li class="breadcrumb-item active">Employees</li>
            </ul>
            <h3>Create Employees</h3>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">
                Basic Details <span>Organized and secure.</span>
              </h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="First Name" />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="Last Name" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="Email" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">
                Employment Details<span
                  >Let everyone know the essentials so they're fully
                  prepared.</span
                >
              </h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <select class="select">
                      <option value="Select leave">
                        Country of Employment
                      </option>
                      <option value="leave">country1</option>
                      <option value="leave">country2</option>
                    </select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="Start Date" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="Job Title" />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <select class="select">
                      <option value="Select leave">Permanent</option>
                      <option value="leave">Freelancer</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">
                Salary Details<span
                  >Stored securely, only visible to Super Admins, Payroll
                  Admins, and themselves.</span
                >
              </h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <select class="select">
                      <option value="Select leave">Currency</option>
                      <option value="leave">$</option>
                    </select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <select class="select">
                      <option value="Select leave">Frequency</option>
                      <option value="leave">Annualy</option>
                      <option value="leave">Monthly</option>
                      <option value="leave">Weekly</option>
                      <option value="leave">Daily</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="Start Date" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-sm-12 col-12">
              <div class="form-btn">
                <a href="#" class="btn btn-apply w-auto">Add Team Member</a>
                <a href="#" class="btn btn-secondary">Cancel</a>
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
  name: "AddEmployee",
};
</script>

<style scoped></style>
