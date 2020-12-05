const IndexPage = () => import("@/components/index/IndexPage");

// supervisor router
const SupervisorRouter = () => import("@/components/supervisor/index/SupervisorRouter");
const SupervisorAdmin = () => import("@/components/supervisor/admin/AdminManagement");
const SupervisorSchool = () => import("@/components/supervisor/school/SchoolManagement");

// admin router
const AdminRouter = () => import("@/components/admin/index/AdminRouter");
const AdminResource = () => import("@/components/admin/resource/ResourceManagement");

// 教学信息管理
const AdminSemester = () => import("@/components/admin/teaching/semester/Semester");
const AdminTimetable = () => import("@/components/admin/teaching/timetable/Timetable");
const AdminSpace = () => import("@/components/admin/teaching/space/Space");
const AdminInstitution = () => import("@/components/admin/teaching/institution/Institution");
const AdminTeacher = () => import("@/components/admin/teaching/teacher/Teacher");
const AdminCourse = () => import("@/components/admin/teaching/course/Course");
const AdminSchedule = () => import("@/components/admin/teaching/schedule/Schedule");

// 设备管理
const AdminInstallation = () => import("@/components/admin/device/installation/Installation");
const AdminUpgrade = () => import("@/components/admin/device/upgrade/Upgrade");

// teacher router
const TeacherRouter = () => import("@/components/teacher/index/TeacherRouter");
const TeacherCourse = () => import("@/components/teacher/course/Index");


// student router
const landPage = () => import("@/pages/LandingPage.vue");
const studentHome = () => import ('@/pages/student/StudentHomePage.vue');
const studentNavigator = () => import ('@/pages/student/StudentNavigatorPage.vue');

const courseCatalog = () => import ('@/pages/student/menu/CourseCatalog.vue');

const courseHome = () => import ('@/pages/student/course/CourseHome.vue');
const courseDetail = () => import ('@/pages/student/course/CourseDetail.vue');
const videoPage = () => import ('@/pages/student/course/Video.vue');
const homework = () => import ('@/pages/student/course/Homework.vue');

const userProfile = () => import ('@/pages/student/user/UserProfile.vue');
const password = () => import ('@/pages/student/user/Password.vue');
const message = () => import ('@/pages/student/user/Message.vue');

const favorite = () => import ('@/pages/student/menu/Favorite.vue');
const analysis = () => import ('@/pages/student/menu/Analysis.vue');

const sign = () => import ('@/pages/student/course/class/Sign.vue');
const quiz = () => import ('@/pages/student/course/class/Quiz.vue');
const random = () => import ('@/pages/student/course/class/Random.vue');
const questionnaire = () => import ('@/pages/student/course/class/Questionnaire.vue');
const vote = () => import ('@/pages/student/course/class/Vote.vue');
const test = () => import ('@/pages/student/course/class/Test.vue');
const file = () => import ('@/pages/student/course/class/File.vue');

export const routes = [
  {
    path: "/",
    name: "index",
    component: IndexPage,
  },
  {
    path: "/admin",
    component: AdminRouter,
    children: [
      {
        path: "resource",
        name: "admin_resource",
        component: AdminResource,
      },
      {
        path: "institution",
        name: "admin_institution",
        component: AdminInstitution,
      },
      {
        path: "course",
        name: "admin_course",
        component: AdminCourse,
      },
      {
        path: "schedule",
        name: "admin_schedule",
        component: AdminSchedule,
      },
      {
        path: "space",
        name: "admin_space",
        component: AdminSpace,
      },
      {
        path: "teacher",
        name: "admin_teacher",
        component: AdminTeacher,
      },
      {
        path: "timetable",
        name: "admin_timetable",
        component: AdminTimetable,
      },
      {
        path: "semester",
        name: "admin_semester",
        component: AdminSemester,
      },
      {
        path: "installation",
        name: "admin_installation",
        component: AdminInstallation
      },
      {
        path: "upgrade",
        name: "admin_upgrade",
        component: AdminUpgrade
      }
    ],
  },
  {
    path: "/supervisor",
    component: SupervisorRouter,
    children: [
      {
        path: "admin",
        name: "supervisor_admin",
        component: SupervisorAdmin,
      },
      {
        path: "school",
        name: "supervisor_school",
        component: SupervisorSchool,
      },
    ],
  },
  {
    path: "/teacher",
    name: "teacher",
    component: TeacherRouter,
    children:[
      {
        path:"course",
        name: "teacher_course",
        component: TeacherCourse
      }
    ]
  },
  {
    path: "/signin",
    component: landPage,
  },
  {
    path: "/student/home",
    component: studentHome,
  },
  {
    path: "/student",
    component: studentNavigator,
    children: [
      {
        path: "course",
        component: courseCatalog,
      },
      {
        path: "course/:id",
        component: courseHome,
        children: [
          {
            path: "/",
            component: courseDetail,
          },
          {
            path: "sign",
            component: sign,
          },
          {
            path: "quiz",
            component: quiz,
          },
          {
            path: "random",
            component: random,
          },
          {
            path: "questionnaire",
            component: questionnaire,
          },
          {
            path: "vote",
            component: vote,
          },
          {
            path: "test",
            component: test,
          },
          {
            path: "file",
            component: file,
          },
          {
            path: "video/:id",
            component: videoPage,
          },
          {
            path: "homework",
            component: homework,
          },
        ],
      },
      {
        path: "favorite",
        component: favorite,
      },
      {
        path: "analysis",
        component: analysis,
      },
      {
        path: "user",
        component: userProfile,
      },
      {
        path: "password",
        component: password,
      },
      {
        path: "message",
        component: message,
      },
    ],
  },
];