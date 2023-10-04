import React from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import useDebounce from "../../hooks/useDebounce";
import CourseItem from "../../components/CoursesItem/CourseItem";
import { Empty, Skeleton } from "antd";

const Course = () => {
  const { data, loading: apiLoading } = useQuery(courseService.getCourses);
  const courses = data?.data?.courses || [];
  const loading = useDebounce(apiLoading, 2000);
  console.log("🚀courses---->", loading);
  return (
    <main class="mainwrapper courses --ptop">
      <div class="container">
        <div class="textbox">
          <div class="container">
            <h2 class="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div class="courses__list">
          {loading &&
            Array(4)
              .fill("")
              .map((_, index) => {
                return (
                  <div
                    style={{ width: "45%", height: "50vh" }}
                    key={index}
                    className="course__list-item"
                  >
                    <Skeleton active />
                    <br />
                    <Skeleton active />
                  </div>
                );
              })}
          {!loading && courses?.length === 0 && <Empty description="No Data" />}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || course} {...course} />;
            })}
        </div>
      </div>
    </main>
  );
};

export default Course;
