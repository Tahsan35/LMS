import CallToAction from "../../components/student/CallToAction";
import Companies from "../../components/student/Companies";
import CoursesSection from "../../components/student/CoursesSection";
import Hero from "../../components/student/Hero";
import SearchBar from "../../components/student/SearchBar";
import TestimonialsSection from "../../components/student/TestimonialsSection";

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center space-y">
      <Hero />
      <SearchBar />
      <Companies />
      <CoursesSection />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
};

export default Home;
