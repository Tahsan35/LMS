import Companies from "../../components/student/Companies";
import Hero from "../../components/student/Hero";
import SearchBar from "../../components/student/SearchBar";

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center space-y">
      <Hero />
      <SearchBar />
      <Companies />
    </div>
  );
};

export default Home;
