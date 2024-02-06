<template>
  <div class="header">
    <div class="header-left">
      <a href="/" class="logo">
        <!-- <img src="@/assets/img/logo.png" alt="Logo" /> -->
      </a>
      <a href="/" class="logo logo-small">
        <img
          src="@/assets/img/logo-small.png"
          alt="Logo"
          width="30"
          height="30"
        />
      </a>
      <a href="javascript:void(0);" id="toggle_btn">
        <span class="bar-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </a>
    </div>

    <a class="mobile_btn" id="mobile_btn">
      <i class="fas fa-bars"></i>
    </a>

    <ul class="nav user-menu">
      <li class="nav-item dropdown">
        <a
          href="#"
          class="dropdown-toggle nav-link pr-0"
          data-toggle="dropdown"
        >
          <i data-feather="bell"></i> <span class="badge badge-pill"></span>
        </a>
        <div class="dropdown-menu notifications">
          <div class="topnav-dropdown-header">
            <span class="notification-title">Notifications</span>
            <a href="javascript:void(0)" class="clear-noti"> Clear All</a>
          </div>
          <div class="noti-content">
            <ul class="notification-list">
              <li class="notification-message">
                <a href="activities.html">
                  <div class="media">
                    <span class="avatar avatar-sm">
                      <img
                        class="avatar-img rounded-circle"
                        alt=""
                        src="@/assets/img/profiles/avatar-02.jpg"
                      />
                    </span>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title">Brian Johnson</span> paid the
                        invoice <span class="noti-title">#DF65485</span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">4 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="activities.html">
                  <div class="media">
                    <span class="avatar avatar-sm">
                      <img
                        class="avatar-img rounded-circle"
                        alt=""
                        src="@/assets/img/profiles/avatar-03.jpg"
                      />
                    </span>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title">Marie Canales</span> has
                        accepted your estimate
                        <span class="noti-title">#GTR458789</span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">6 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="activities.html">
                  <div class="media">
                    <div class="avatar avatar-sm">
                      <span class="avatar-title rounded-circle bg-primary-light"
                        ><i class="far fa-user"></i
                      ></span>
                    </div>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title">New user registered</span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">8 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="activities.html">
                  <div class="media">
                    <span class="avatar avatar-sm">
                      <img
                        class="avatar-img rounded-circle"
                        alt=""
                        src="@/assets/img/profiles/avatar-04.jpg"
                      />
                    </span>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title">Barbara Moore</span> declined
                        the invoice <span class="noti-title">#RDW026896</span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">12 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="notification-message">
                <a href="activities.html">
                  <div class="media">
                    <div class="avatar avatar-sm">
                      <span class="avatar-title rounded-circle bg-info-light"
                        ><i class="far fa-comment"></i
                      ></span>
                    </div>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title"
                          >You have received a new message</span
                        >
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">2 days ago</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="topnav-dropdown-footer">
            <a href="activities.html">View all Notifications</a>
          </div>
        </div>
      </li>

      <li class="nav-item dropdown has-arrow main-drop">
        <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
          <span class="user-img">
            <img src="@/assets/img/profile.jpg" alt="" />
            <span class="status online"></span>
          </span>
          <span>Kavin Hansen</span>
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="profile.html"
            ><i data-feather="user" class="mr-1"></i> Profile</a
          >
          <a class="dropdown-item" href="settings.html"
            ><i data-feather="settings" class="mr-1"></i> Settings</a
          >
          <a class="dropdown-item" href="login.html"
            ><i data-feather="log-out" class="mr-1"></i> Logout</a
          >
        </div>
      </li>
    </ul>
    <div class="dropdown mobile-user-menu show">
      <a
        href="#"
        class="nav-link dropdown-toggle"
        data-toggle="dropdown"
        aria-expanded="false"
        ><i class="fa fa-ellipsis-v"></i
      ></a>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="profile.html">My Profile</a>
        <a class="dropdown-item" href="settings.html">Settings</a>
        <a class="dropdown-item" href="login.html">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
