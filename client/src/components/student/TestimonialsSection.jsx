import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="px-8 md:px-0 py-16">
      <h2 className="text-3xl font-medium test-gray-800">Testimonials</h2>
      <p className="md:text-lg text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of transformation,
        <br />
        success, and how our platform has made a difference in their lives.
      </p>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-4 md:px-36 my-10 md:my-16 gap-10">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] overflow-hidden shadow-black/5"
          >
            <div className="flex gap-4 items-center px-5 py-4 bg-gray-500/10">
              <img
                className="h-12 w-12 rounded-full"
                src={testimonial.image}
                alt="testimonial"
              ></img>
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  ></img>
                ))}
              </div>
              <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
            </div>
            <a href={testimonial.courseLink} className="text-blue-500 px-5">
              read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
