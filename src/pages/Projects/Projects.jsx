import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Projects.scss";
import ProjectSummaryCard from "../../components/Cards/ProjectSummaryCard.jsx";
import NoListAvailableYet from "../../components/NoListAvailableYet.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import SortByModal from "../../components/Sorting/SortByModal.jsx";
import CustomPagination from "../../components/Common/CustomPagination/CustomPagination.jsx";
import { clearAllProjects, fetchProjects } from "../../api/projectsSlice.jsx";
import { LocaleStrings } from "../../constants/locale-strings.jsx";
import colors from "../../theme/colors";

const Projects = () => {
  const { projectsScreen, resultsText, sortingModal, separatorText } =
    LocaleStrings;
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const userId = userProfile?.userId;
  const defaultSortingValue = {
    field: "created",
    direction: "desc",
  };

  const defaultPageNo = 1;
  const [activeTab, setActiveTab] = useState("my");
  const [page, setPage] = useState(defaultPageNo);
  const [sort, setSort] = useState(defaultSortingValue);

  const sortBy = `${sort.field.toUpperCase()}_${sort.direction.toUpperCase()}`;
  const pageSize = 6;
  const sortOptions = [
    {
      label: sortingModal.sortByDateDescendingOptionText,
      field: "created",
      direction: "desc",
    },
    {
      label: sortingModal.sortByDateAscendingOptionText,
      field: "created",
      direction: "asc",
    },
  ];

  const dispatch = useDispatch();
  const {
    allProjects = [],
    totalCount = 0,
    loading,
    error,
  } = useSelector((state) => state.projects);

  const is404 = error === 404;
  const hasProjects = is404 ? false : allProjects.length > 0;

  useEffect(() => {
    dispatch(clearAllProjects());
    const timeout = setTimeout(() => {
      const params = {
        sortBy,
        pageNo: page,
        pageSize,
        ...(activeTab === "my" && { userId }),
      };
      dispatch(fetchProjects(params));
    }, 0);
    return () => clearTimeout(timeout);
  }, [dispatch, sortBy, page, pageSize, userId, activeTab]);

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(defaultPageNo);
  };

  const handleTabChange = (tab) => {
    {
      setActiveTab(tab);
      setPage(defaultPageNo);
      setSort(defaultSortingValue);
    }
  };

  if (loading) return <Loader />;

  const renderNoProjects = () => (
    <div className="projectsMainContainer-projects-error-section">
      <NoListAvailableYet
        imageSrc="/assets/svg/No_Projects.svg"
        title={projectsScreen.noProjectsSection.title}
        description={projectsScreen.noProjectsSection.descriptionText}
        buttons={[
          {
            title: projectsScreen.noProjectsSection.createNewProjectButtonTitle,
            imageSrc: "/assets/svg/Plus_White.svg",
            imageColor: colors.secondary,
            borderColor: colors.primary,
            onClick: () => console.log("Create New Project clicked"),
          },
          ...(activeTab === "my"
            ? [
                {
                  title:
                    projectsScreen.noProjectsSection
                      .viewOtherProjectsButtonTitle,
                  onClick: () => handleTabChange("all"),
                },
              ]
            : []),
        ]}
      />
    </div>
  );

  const renderError = () => (
    <div className="projectsMainContainer-projects-error-section">
      <NoListAvailableYet
        imageSrc="/assets/svg/Project_Not_Loading.svg"
        title={projectsScreen.projectNotLoadingSection.title}
        description={projectsScreen.projectNotLoadingSection.description}
      />
    </div>
  );

  return (
    <div className="projectsMainContainer" data-testid="projectsMainContainer">
      <p
        className="text-montserrat-24-bold"
        style={{ color: "#000000", marginBottom: 4 }}
      >
        {projectsScreen.header}
      </p>

      <p
        className="text-montserrat-16-medium"
        style={{ color: "#6D6D6D", marginBottom: 32 }}
      >
        {projectsScreen.descriptionText}
      </p>
      {!is404 && !hasProjects ? (
        renderError()
      ) : (
        <>
          <div className="tabs-sort-container">
            <div className="tabs">
              <button
                className={activeTab === "my" ? "active" : ""}
                onClick={() => handleTabChange("my")}
              >
                {LocaleStrings.myProjectsButtonText}
              </button>
              <button
                className={activeTab === "all" ? "active" : ""}
                onClick={() => handleTabChange("all")}
              >
                {LocaleStrings.allProjectsButtonText}
              </button>
            </div>

            <div className="sort-box">
              <span className="sort-label">
                {totalCount} {resultsText}
              </span>
              <span className="seperator-label">{separatorText}</span>

              <SortByModal
                label={sortingModal.sortByDateTitle}
                selected={sort}
                onChange={handleSortChange}
                options={sortOptions}
              />
            </div>
          </div>

          {!hasProjects ? (
            renderNoProjects()
          ) : (
            <>
              <div className="projects">
                {allProjects.map((project) => (
                  <ProjectSummaryCard
                    key={project.id}
                    project={project}
                    data-testid={`project-item-${project.id}`}
                  />
                ))}
              </div>

              <div className="projects-pagination-container ">
                <CustomPagination
                  count={Math.ceil(totalCount / pageSize)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
