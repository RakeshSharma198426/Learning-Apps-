// 1. External packages
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.scss";
import StatCardList from "../../components/Cards/StatCardList.jsx";
import ProjectSummaryCardList from "../../components/Cards/ProjectSummaryCardList.jsx";
import RoundedButton from "../../components/Button/RoundedButton.jsx";
import JobTable from "../../components/Table/JobTable.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import NoListAvailableYet from "../../components/NoListAvailableYet.jsx";
import { clearAllProjects, fetchProjects } from "../../api/projectsSlice.jsx";
import { LocaleStrings } from "../../constants/locale-strings.jsx";
import colors from "../../theme/colors";
import { clearAllJobs, fetchJobs } from "../../api/jobsSlice.jsx";

const { dashboardScreen } = LocaleStrings;

const Dashboard = () => {
  const handleViewAllJobs = () => {
    // navigate("/jobs");
    console.log("Naviagte to jobs listing page.");
  };

  const handleViewAllProjects = () => {
    navigate("/projects"); // navigate route
  };

  const handleCreateNewProject = () => {
    console.log("handle 'create new project'");
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { allProjects, totalCount, loading, error } = useSelector(
    (state) => state.projects
  );
  const { allJobs, jobsCompletedCount, jobsInProgressCount, jobsLoading } =
    useSelector((state) => state.jobs);

  const [activeTab, setActiveTab] = useState("my");
  const [activeJobTab, setActiveJobTab] = useState("my");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const is404 = error === 404;
  const hasProjects = is404 ? false : allProjects.length > 0;
  const hasJobs = allJobs.length > 0;
  const shortYear = new Date().getFullYear().toString().slice(-2);

  const sortBy = "CREATED_DESC";
  const pageNo = 1;
  const pageSize = 2;
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const userId = userProfile?.userId;

  useEffect(() => {
    dispatch(clearAllJobs());

    const timeout = setTimeout(() => {
      const params = {
        sortBy,
        pageNo,
        pageSize: 5,
        ...(activeJobTab === "my" ? { userId } : {}),
      };
      dispatch(fetchJobs(params));
    }, 0);

    return () => clearTimeout(timeout);
  }, [dispatch, activeJobTab, sortBy, pageNo, userId]);

  useEffect(() => {
    dispatch(clearAllProjects());
    const timeout = setTimeout(() => {
      const params = {
        sortBy,
        pageNo,
        pageSize,
        ...(activeTab === "my" ? { userId } : {}),
      };
      dispatch(fetchProjects(params)).then(() => {
        setIsInitialLoad(false);
      });
    }, 0);
    return () => clearTimeout(timeout);
  }, [dispatch, sortBy, pageNo, pageSize, userId, activeTab]);

  if (loading && isInitialLoad) return <Loader />;

  return (
    <div className="dashboard" data-testid="dashboard">
      <Header title={dashboardScreen.header} />
      <QuickStatsSection
        totalCount={totalCount}
        jobsCompletedCount={jobsCompletedCount}
        jobsInProgressCount={jobsInProgressCount}
        shortYear={shortYear}
      />
      <RecentProjectsSection
        onViewAll={handleViewAllProjects}
        onCreateNewProject={handleCreateNewProject}
        hasProjects={hasProjects}
        projects={allProjects}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loading={loading && !isInitialLoad}
      />
      <RecentJobsSection
        onViewAll={handleViewAllJobs}
        viewProjects={handleViewAllProjects}
        hasJobs={hasJobs}
        allJobs={allJobs}
        activeJobTab={activeJobTab}
        setActiveJobTab={setActiveJobTab}
        loading={jobsLoading}
      />
    </div>
  );
};

const Header = ({ title }) => (
  <p
    className="text-montserrat-24-bold"
    style={{ marginTop: "42px", marginBottom: "32px" }}
  >
    {title}
  </p>
);

const QuickStatsSection = ({
  totalCount,
  shortYear,
  jobsCompletedCount,
  jobsInProgressCount,
}) => {
  const { quickStatsSection, quickStatsSectionTitle } =
    LocaleStrings.dashboardScreen;

  const quickStatsData = [
    {
      title: quickStatsSection.totalProjectsTitle,
      subtitle: totalCount?.toString() || "0",
      description: `${quickStatsSection.tillFy} ${shortYear}`,
    },
    {
      title: quickStatsSection.ongoingProjectsTitle,
      subtitle: jobsInProgressCount || 0,
      description: `${quickStatsSection.tillFy} ${shortYear}`,
    },
    {
      title: quickStatsSection.completedProjectsTitle,
      subtitle: jobsCompletedCount || 0,
      description: `${quickStatsSection.tillFy} ${shortYear}`,
    },
  ];

  return (
    <>
      <p className="text-montserrat-16-bold">{quickStatsSectionTitle}</p>
      <StatCardList cards={quickStatsData} />
    </>
  );
};

const RecentProjectsSection = ({
  onViewAll,
  onCreateNewProject,
  hasProjects,
  projects,
  activeTab,
  setActiveTab,
  loading,
}) => {
  const {
    recentProjectsSection,
    createNewProjectButtonTitle,
    viewAllProjectsButtonTitle,
  } = LocaleStrings.dashboardScreen;

  const renderNoProjects = () => (
    <NoListAvailableYet
      title={recentProjectsSection.noProjectsTitle}
      description={recentProjectsSection.noProjectsDescription}
      buttons={
        activeTab === "my"
          ? [
              {
                title: createNewProjectButtonTitle,
                imageSrc: "/assets/svg/Plus_White.svg",
                imageColor: colors.secondary,
                borderColor: colors.primary,
                onClick: () => console.log("Start New Project clicked"),
              },
              {
                title: viewAllProjectsButtonTitle,
                onClick: () => setActiveTab("all"),
              },
            ]
          : [
              {
                title: createNewProjectButtonTitle,
                imageSrc: "/assets/svg/Plus_White.svg",
                imageColor: colors.secondary,
                borderColor: colors.primary,
                onClick: () => console.log("Start New Project clicked"),
              },
            ]
      }
    />
  );

  return (
    <>
      <p className="text-montserrat-16-bold" style={{ paddingTop: "48px" }}>
        {dashboardScreen.recentProjectsSectionTitle}
      </p>

      <div className="tabs-sort-container">
        <div className="tabs">
          <button
            disabled={loading}
            className={activeTab === "my" ? "active" : ""}
            onClick={() => setActiveTab("my")}
          >
            {LocaleStrings.myProjectsButtonText}
          </button>
          <button
            disabled={loading}
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            {LocaleStrings.allProjectsButtonText}
          </button>
        </div>
      </div>

      {loading ? (
        <div
          style={{
            height: "240px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : !hasProjects ? (
        renderNoProjects()
      ) : (
        <ProjectSummaryCardList
          projects={projects}
          onViewAll={onViewAll}
          onCreateNewProject={onCreateNewProject}
        />
      )}
    </>
  );
};

const RecentJobsSection = ({
  onViewAll,
  allJobs,
  hasJobs,
  activeJobTab,
  setActiveJobTab,
  loading,
  viewProjects,
}) => {
  const { recentJobsSectionTitle, recentJobsSection } =
    LocaleStrings.dashboardScreen;
  return (
    <div className="recent-jobs-container">
      <div className="recent-jobs-title">
        <span className="text-montserrat-16-bold">
          {recentJobsSectionTitle}
        </span>
        {hasJobs && (
          <RoundedButton
            text="Refresh"
            imageSrc="assets/svg/Refresh.svg"
            variant="secondary-small"
            onClick={() => {}}
            height={32}
            width={108}
            testId="refresh-button"
          />
        )}
      </div>

      <div className="tabs">
        <button
          className={activeJobTab === "my" ? "active" : ""}
          disabled={loading}
          onClick={() => setActiveJobTab("my")}
        >
          {LocaleStrings.myJobsButtonText}
        </button>
        <button
          className={activeJobTab === "all" ? "active" : ""}
          disabled={loading}
          onClick={() => setActiveJobTab("all")}
        >
          {LocaleStrings.allJobsButtonText}
        </button>
      </div>
      {loading ? (
        <div
          style={{
            height: "240px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : !hasJobs ? (
        activeJobTab === "my" ? (
          <NoListAvailableYet
            title={recentJobsSection.noJobsMyTabTitle}
            description={recentJobsSection.noJobsMyTabDescription}
            buttons={[
              {
                title: recentJobsSection.viewProjects,
                onClick: viewProjects,
              },
              {
                title: recentJobsSection.viewAllJobs,
                onClick: () => {
                  setActiveJobTab("all");
                },
              },
            ]}
          />
        ) : (
          <NoListAvailableYet
            title={recentJobsSection.noJobsTitle}
            description={recentJobsSection.noJobsDescription}
            buttons={[
              {
                imageSrc: "/assets/svg/Plus_White.svg",
                title: recentJobsSection.createNewJobButton,
                onClick: () => console.log("create new job"),
              },
            ]}
          />
        )
      ) : (
        <JobTable
          allJobs={allJobs}
          onViewAll={onViewAll}
          isViewAllPresent={true}
        />
      )}
    </div>
  );
};

export default Dashboard;
