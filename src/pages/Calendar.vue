<template>
  <div class="page-wrapper calendar_page">
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
              <li class="breadcrumb-item active">Calendar</li>
            </ul>
            <h3>Calendar</h3>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-3 col-md-4">
          <div class="card">
            <div class="card-body">
              <h2 class="calendar_head">Calendar</h2>
            </div>
            <div class="calendar_events">
              <h4 class="card-title">
                Drag and drop your event or click in the calendar
              </h4>
              <div id="calendar-events" class="mb-3">
                <div class="calendar-events" data-class="bg-info">
                  <i class="fas fa-square bg-primary"></i> New Theme Release
                </div>
                <div class="calendar-events" data-class="bg-success">
                  <i class="fas fa-square bg-success"></i>My Event
                </div>
                <div class="calendar-events" data-class="bg-danger">
                  <i class="fas fa-square bg-warning"></i> Meet Manager
                </div>
                <div class="calendar-events" data-class="bg-warning">
                  <i class="fas fa-square bg-secondary"></i> Create New theme
                </div>
              </div>
              <div class="checkbox mb-3">
                <input id="drop-remove" type="checkbox" />
                <label for="drop-remove"> Remove after drop </label>
              </div>
              <a
                href="#"
                data-toggle="modal"
                data-target="#add_new_event"
                class="btn mb-3 btn-primary btn-block"
              >
                <i class="fas fa-plus"></i> Create New
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-md-8">
          <div class="card bg-white">
            <div class="card-body">
              <div id="calendar"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="customize_popup">
        <div
          class="modal fade"
          id="add_event"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabelevent"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabelevent">
                  Add New Event
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="col-md-12 p-0">
                  <div class="form-popup">
                    <label>Event Name</label>
                    <input type="text" placeholder="Insert Event Name" />
                  </div>
                  <div class="form-popup">
                    <label>Category Color</label>
                    <select name="Danger">
                      <option value="Danger">Danger</option>
                      <option value="Success">Success</option>
                      <option value="Warning">Warning</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-apply">Apply</button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="customize_popup">
        <div
          class="modal fade"
          id="my_event"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabeladd"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabeladd">
                  Add New Event
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="col-md-12 p-0">
                  <div class="form-popup">
                    <label>Event Name</label>
                    <input type="text" placeholder="Insert Event Name" />
                  </div>
                  <div class="form-popup">
                    <label>Category Color</label>
                    <select name="Danger">
                      <option value="Danger">Danger</option>
                      <option value="Success">Success</option>
                      <option value="Warning">Warning</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-apply">Apply</button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="customize_popup">
        <div
          class="modal fade"
          id="add_new_event"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Add a category
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="col-md-12 p-0">
                  <div class="form-popup">
                    <label>Category Name</label>
                    <input type="text" placeholder="Enter Name" />
                  </div>
                  <div class="form-popup">
                    <label>Choose Category Color</label>
                    <select name="Success">
                      <option value="Success">Success</option>
                      <option value="Cancel">Danger</option>
                      <option value="Cancel">Warning</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-apply">Apply</button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
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
  name: "CalendarPage",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
