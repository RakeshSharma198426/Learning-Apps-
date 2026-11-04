import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllJobs, fetchJobs } from "../../api/jobsSlice.jsx";
import { LocaleStrings } from "../../constants/locale-strings.jsx";
import JobTable from "../../components/Table/JobTable.jsx";
import NoListAvailableYet from "../../components/NoListAvailableYet.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import RoundedButton from "../../components/Button/RoundedButton.jsx";
import SortByModal from "../../components/Sorting/SortByModal.jsx";
import "./Jobs.scss";

const Jobs = () => {
  const { jobsScreen, resultsText, sortingModal, separatorText } =
    LocaleStrings;
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const userId = userProfile?.userId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultPageNo = 1;
  const { allJobs, jobsLoading, totalRecords, error } = useSelector(
    (state) => state.jobs
  );
  const defaultSortingValue = {
    field: "created",
    direction: "desc",
  };
  const [activeJobTab, setActiveJobTab] = useState("my");
  const [sort, setSort] = useState(defaultSortingValue);

  const is404 = error === 404;
  const hasJobs = is404 ? false : allJobs.length > 0;
  const sortBy = `${sort.field.toUpperCase()}_${sort.direction.toUpperCase()}`;
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
  useEffect(() => {
    dispatch(clearAllJobs());
    refreshJobs();
  }, [dispatch, activeJobTab, sortBy, userId]);

  const handleTabChange = (tab) => {
    {
      setActiveJobTab(tab);
      setSort(defaultSortingValue);
    }
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(defaultPageNo);
  };

  const refreshJobs = () => {
    const timeout = setTimeout(() => {
      const params = {
        sortBy,
        pageNo: defaultPageNo,
        ...(activeJobTab === "my" ? { userId } : {}),
      };
      dispatch(fetchJobs(params));
    }, 0);
    return () => clearTimeout(timeout);
  };

  if (jobsLoading) return <Loader />;

  const renderNoJobs = () => (
    <div className="jobs-listing-error-section">
      {activeJobTab === "my" ? (
        <NoListAvailableYet
          imageSrc="/assets/svg/No_Jobs.svg"
          title={jobsScreen.noJobsSection.title}
          description={jobsScreen.noJobsSection.description}
          buttons={[
            {
              title: jobsScreen.noJobsSection.viewProjectsButtonText,
              onClick: () => navigate("/projects"),
            },
            {
              title: jobsScreen.noJobsSection.viewAllJobsButtonText,
              onClick: () => handleTabChange("all"),
            },
          ]}
        ></NoListAvailableYet>
      ) : (
        <NoListAvailableYet
          imageSrc="/assets/svg/No_Jobs.svg"
          title={jobsScreen.noJobsSection.titleTextAllJobs}
          description={jobsScreen.noJobsSection.description}
          buttons={[
            {
              title: jobsScreen.noJobsSection.viewProjectsButtonText,
              onClick: () => navigate("/projects"),
            },
          ]}
        ></NoListAvailableYet>
      )}
    </div>
  );

  const renderError = () => (
    <div className="jobs-listing-error-section">
      <NoListAvailableYet
        imageSrc="/assets/svg/Project_Not_Loading.svg"
        title={jobsScreen.jobsNotLoadingError.title}
        description={jobsScreen.jobsNotLoadingError.description}
      />
    </div>
  );
  return (
    <div className="jobs-listing" data-testid="jobs">
      <div className="jobs-listing-title">
        <span
          className="text-montserrat-24-bold"
          style={{ color: "#000000", marginBottom: 4 }}
        >
          {jobsScreen.title}
        </span>

        <div className="sort-box">
          {hasJobs && (
            <div className="refresh-button-wrapper">
              <RoundedButton
                text="Refresh"
                imageSrc="assets/svg/Refresh.svg"
                variant="secondary-small"
                onClick={refreshJobs}
                height={32}
                width={108}
                testId="refresh-button"
              />
            </div>
          )}
          <span className="sort-label">
            {totalRecords} {resultsText}
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

      {!is404 && !hasJobs ? (
        renderError()
      ) : (
        <>
          <div className="tabs-sort-container">
            <div className="tabs">
              <button
                className={activeJobTab === "my" ? "active" : ""}
                disabled={jobsLoading}
                onClick={() => setActiveJobTab("my")}
              >
                {LocaleStrings.myJobsButtonText}
              </button>
              <button
                className={activeJobTab === "all" ? "active" : ""}
                disabled={jobsLoading}
                onClick={() => setActiveJobTab("all")}
              >
                {LocaleStrings.allJobsButtonText}
              </button>
            </div>
          </div>

          {!hasJobs ? (
            renderNoJobs()
          ) : (
            <div className="jobs-listing-table">
              <JobTable allJobs={allJobs} isViewAllPresent={false} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;
