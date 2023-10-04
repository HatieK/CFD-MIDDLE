import axios from "axios";
import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { teamService } from "../../services/teamService";
import HeroSection from "./HeroSection";
import CourseComingSection from "./CourseComingSection";
import CourseSection from "./CourseSection";
import TeacherSection from "./TeacherSection";
import FeaturedSection from "./FeaturedSection";
import TestimonialSection from "./TestimonialSection";
import FaqSection from "./FaqSection";
import GallerySection from "./GallerySection";
import CallRegisterSection from "./CallRegisterSection";
import { questionService } from "../../services/questionService";
import { galleryService } from "../../services/galleryService";

const HomePage = () => {
  // call api bằng useQuery
  const {
    data: coursesData,

    loading: coursesLoading,
  } = useQuery(courseService.getCourses);

  /*
  Kiểm tra xem có giá trị api trả về hay không, có thì gán lại cho courses ko có thì
  gán [] cho courses
  Filter sao cho course sắp khai giảng tức là thời gian của course phải lớn hơn
  thời gian hiện tại
   */
  const courses = coursesData?.data.courses || [];
  const comingCourses =
    courses.filter((course) => {
      return course?.startDate && new Date(course.startDate) > new Date();
    }) || [];

  // console.log("🚀comingCourses---->", comingCourses);

  // Teams
  const { data: teamsData, loading: teamsLoading } = useQuery(
    teamService.getTeams
  );

  const teams = teamsData?.data.teams || [];
  // Questions
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getQuestions
  );

  const questions = questionsData?.data.questions || [];

  // Gallery
  const { data: galleriesData, loading: galleriesLoading } = useQuery(
    galleryService.getGalleries
  );

  console.log("🚀galleriesData---->", galleriesData);
  const galleries = galleriesData?.data.galleries?.[0]?.images || [];
  console.log("🚀galleries---->", galleries);
  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection courses={comingCourses} loading={coursesLoading} />
      <CourseSection courses={courses} loading={coursesLoading} />
      <TeacherSection teachers={teams} loading={teamsLoading} />
      <FeaturedSection />
      {/* --------------------------------Testimonial-------------------------------- */}
      <TestimonialSection />
      {/* --------------------------------faq-------------------------------- */}
      <FaqSection questions={questions} loading={questionsLoading} />
      {!galleriesLoading && (
        <GallerySection galleries={galleries} loading={galleriesLoading} />
      )}
      <CallRegisterSection />
    </main>
  );
};

export default HomePage;
