import React from "react";
import Header from "./Header";
import aboutimg from "../assests/about.png";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="bg-slate-50 shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-row flex-wrap justify-around items-center">
          <div className="p-6 flex flex-col max-w-xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              About UpSkill Vision
            </h1>
            <p className="text-gray-600 mb-6">
              UpSkill Vision is an innovative Learning and Development (L&D)
              platform designed to empower employees through personalized
              learning experiences. By enabling managers to track progress and
              assess performance, we bridge the gap between training and
              organizational success.
            </p>
            <p className="text-gray-600">
              Our mission is to create a user-friendly platform that enhances
              skill development and aligns with the ever-changing demands of the
              modern workplace.
            </p>
          </div>
          <div className="max-w-xl">
            <img
              src={aboutimg}
              alt="About UpSkill Vision"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="bg-slate-50 pt-10 flex flex-wrap flex-row justify-around">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Who We Are
        </h2>
        <div className="flex flex-wrap flex-row justify-around ">
          <div className="p-6 bg-white shadow-md rounded-lg max-w-xl text-justify">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To provide a comprehensive e-learning platform that fosters growth
              and skill enhancement for employees while driving organizational
              success.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg max-w-xl text-justify">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading platform for learning and development,
              empowering individuals to excel in their careers and contributing
              to a knowledgeable workforce.
            </p>
          </div>

          <div className="p-6 mt-6 bg-white shadow-md rounded-lg max-w-xl text-justify">
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Core Values
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Innovation in learning methodologies.</li>
              <li>Commitment to quality and user experience.</li>
              <li>Empowering individuals through knowledge.</li>
              <li>Adaptability to the dynamic needs of industries.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* E-learning Benefits Section */}
      <div className="pt-10 bg-slate-50">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Why Choose an E-Learning Platform?
        </h2>
        <div className="flex flex-row flex-wrap justify-around">
          <div className="p-6 bg-white shadow-md rounded-lg max-w-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Flexible Learning
            </h3>
            <p className="text-gray-600">
              With UpSkill Vision, learners can access courses anytime,
              anywhere, ensuring flexibility that adapts to individual
              schedules.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg max-w-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Personalized Experience
            </h3>
            <p className="text-gray-600">
              Tailored learning paths and dynamic content adjust to the
              learner’s progress, creating a truly personalized experience.
            </p>
          </div>
        </div>
      </div>

      {/* Course Quality Section */}
      <div className="pt-10 bg-slate-50">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Ensuring Course Quality
        </h2>
        <p className="text-gray-600 text-center mb-6">
          At UpSkill Vision, we prioritize delivering high-quality learning
          materials that resonate with real-world needs.
        </p>
        <div className="flex flex-row flex-wrap justify-around">
          <div className="bg-white shadow-md rounded-lg p-6 text-center m-5 max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Industry-Relevant Content
            </h3>
            <p className="text-gray-600">
              Courses designed by experts to meet current market trends and
              demands.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center m-5 max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Interactive Modules
            </h3>
            <p className="text-gray-600">
              Engaging quizzes, videos, and activities to boost knowledge
              retention.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center m-5 max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Regular Updates
            </h3>
            <p className="text-gray-600">
              Content is frequently updated to ensure accuracy and
              effectiveness.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
