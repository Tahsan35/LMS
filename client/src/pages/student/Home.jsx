import Hero from "../../components/student/Hero";
import SearchBar from "../../components/student/SearchBar";

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center space-y">
      <Hero />
      <SearchBar />
    </div>
  );
};

export default Home;
