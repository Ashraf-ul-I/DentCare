import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "5 Tips for Better Oral Hygiene",
    excerpt: `Maintaining good oral hygiene is essential for your overall health and well-being. It goes beyond just brushing your teeth twice a day. The first tip is to use the right toothbrush and toothpaste. A soft-bristled brush is gentle on your gums and effective at cleaning your teeth, while fluoride toothpaste helps strengthen enamel and prevent decay. Secondly, floss daily to remove plaque and food particles that your brush can't reach, especially between teeth. Thirdly, avoid sugary snacks and drinks as they contribute to the growth of bacteria in your mouth. Instead, choose water and teeth-friendly snacks like cheese, nuts, and fruits. Tip number four is to visit your dentist at least twice a year for professional cleanings and early detection of issues like cavities, gum disease, or oral cancer. Lastly, don’t forget your tongue – bacteria can accumulate there too. Use a tongue scraper or your brush to clean it daily. These five practices, when done consistently, form the foundation of a strong oral hygiene routine that keeps your teeth and gums healthy throughout your life. Good oral habits are easy to build and offer lifelong rewards. Additionally, consider using mouthwash to reach areas your toothbrush may miss. Incorporating these steps not only helps you maintain a bright smile but also prevents more serious health problems like gum infections and heart disease, which are often linked to poor dental hygiene. Start today, and your future self will thank you.`,
    date: "March 15, 2024",
    image:
      "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    title: "Understanding Root Canal Treatment",
    excerpt: `Root canal treatment is one of the most common dental procedures that often evokes fear among patients due to misconceptions. However, it is a highly effective way to save a tooth that is severely infected or decayed. The root canal procedure involves removing the damaged pulp inside the tooth, cleaning and disinfecting the root canals, and then filling and sealing them to prevent further infection. Typically, local anesthesia is used, making the process relatively painless. Patients may feel some pressure, but the procedure itself is no more uncomfortable than getting a regular filling. It's important to understand why a root canal may be necessary – often, it’s due to deep decay, repeated dental procedures, or a crack in the tooth that has allowed bacteria to reach the pulp. Ignoring the symptoms like persistent toothache, sensitivity to hot and cold, swelling, or darkening of the tooth can lead to abscesses and more serious health complications. After the treatment, your dentist will usually place a crown to protect and restore the tooth’s function and appearance. Root canals have a high success rate and can last a lifetime with proper care. Maintaining oral hygiene, visiting the dentist regularly, and avoiding hard foods can ensure your treated tooth remains strong. Modern dentistry has made root canal treatment faster, more comfortable, and more successful than ever before. In summary, root canal treatment should not be feared; it is a tooth-saving solution that restores comfort and function while protecting your smile.`,
    date: "March 10, 2024",
    image:
      "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    title: "Benefits of Regular Dental Checkups",
    excerpt: `Many people underestimate the importance of regular dental checkups, but they are one of the most valuable ways to maintain optimal oral health. Preventive care allows dentists to identify issues like cavities, gum disease, or even oral cancer early, when treatment is easier and less costly. A typical dental visit includes professional cleaning, which removes tartar and plaque buildup that you can’t remove with brushing and flossing alone. It also helps in polishing your teeth for a cleaner and brighter smile. During your visit, your dentist will check for signs of decay, infection, and gum recession. This early detection helps prevent problems from worsening or spreading to other parts of the mouth. Moreover, dentists can provide personalized advice based on your oral hygiene habits and lifestyle choices. They may recommend changes in brushing technique, dietary modifications, or fluoride treatments. For children and adolescents, dental visits are crucial to monitor the development of teeth and jaw alignment. Seniors also benefit by managing age-related dental issues such as dry mouth and enamel wear. Additionally, oral health is closely linked with systemic health. Conditions like diabetes, heart disease, and respiratory infections often show symptoms in the mouth. Regular checkups can therefore act as an early warning system for more serious conditions. Ultimately, committing to two dental visits per year can lead to long-term savings, reduced discomfort, and a healthier life. It's a small investment of time that pays off greatly in terms of your health, appearance, and confidence.`,
    date: "March 5, 2024",
    image:
      "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    title: "The Link Between Oral Health and Heart Disease",
    excerpt: `Recent studies have shown a strong link between oral health and cardiovascular health. Bacteria from gum disease can enter the bloodstream and contribute to inflammation in the heart's blood vessels, which increases the risk of heart attacks and strokes. This connection highlights the importance of good oral hygiene not only for a bright smile but also for your overall health. Gingivitis and periodontitis are two common gum diseases caused by plaque buildup. If left untreated, they can lead to severe infections that spread beyond the mouth. Inflammation is a common factor in both oral and heart diseases. When bacteria from inflamed gums enter your bloodstream, they can attach to blood vessels and increase clot formation, leading to cardiovascular problems. Moreover, people with poor oral health often have other risk factors such as smoking, poor diet, and lack of exercise, further compounding their risk. By brushing twice a day, flossing, using an antibacterial mouthwash, and visiting your dentist regularly, you reduce these risks significantly. Dentists are increasingly aware of the need to coordinate care with general practitioners and cardiologists to manage patients with both oral and cardiovascular conditions. It’s a holistic approach that underlines how the body works as a connected system. Paying attention to your mouth could help you prevent serious heart complications in the future. Oral health is not just about avoiding cavities — it can be a key to a longer and healthier life. Make it a priority.`,
    date: "February 28, 2024",
    image:
      "https://images.pexels.com/photos/5355694/pexels-photo-5355694.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    title: "How Diet Affects Your Teeth and Gums",
    excerpt: `Your diet plays a crucial role in maintaining healthy teeth and gums. Sugary and acidic foods can erode enamel and create the perfect environment for bacteria to thrive, leading to cavities and gum disease. On the other hand, a balanced diet that includes plenty of water, fruits, vegetables, dairy, and lean proteins supports strong teeth and healthy gums. For instance, crunchy fruits like apples help clean the teeth naturally, while dairy products like cheese provide calcium and phosphates that rebuild tooth enamel. Avoiding sugary drinks, candies, and starchy snacks helps reduce the risk of plaque buildup and tooth decay. Vitamin C, found in citrus fruits and leafy greens, is vital for maintaining healthy gums, while Vitamin D helps in calcium absorption. Whole grains, nuts, and green tea also contribute to oral health by reducing inflammation and supporting healthy tissue. Furthermore, staying hydrated stimulates saliva production, which helps wash away food particles and neutralize harmful acids. It’s also worth noting that frequent snacking or sipping on sugary drinks throughout the day keeps your teeth in a constant acid attack, so limiting meal frequency can help protect your enamel. A diet tailored for oral health not only benefits your mouth but also boosts your immune system and energy levels. Educating children early on about tooth-friendly foods can prevent many dental issues down the line. In conclusion, food choices have a lasting impact on your oral and overall health. What you eat directly affects your smile — choose wisely.`,
    date: "February 20, 2024",
    image:
      "https://images.pexels.com/photos/4270097/pexels-photo-4270097.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function BlogPage() {
  const { id } = useParams();
  console.log(id);
  const blog = blogPosts.find((b) => b.id === parseInt(id));
  const navigate = useNavigate();

  if (!blog) return <div className="p-10">Blog not found</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto my-8">
      {/* Button to go back to the blog list */}
      <button
        onClick={() => navigate("/blogs")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 mb-6"
      >
        &larr; Back to Blogs
      </button>
      {/* Detailed blog post image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-100 object-cover rounded-lg mb-6"
        // Fallback for image loading errors
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = `https://placehold.co/800x400/cccccc/333333?text=Image+Not+Found`;
        }}
      />
      {/* Detailed blog post title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      {/* Detailed blog post date */}
      <p className="text-base text-gray-500 mb-6">{blog.date}</p>
      {/* Detailed blog post content (using excerpt as full content for now) */}
      <div className="text-lg text-gray-700 leading-relaxed ">
        {blog.excerpt.split(". ").map((sentence, i, arr) => (
          // Add a period back to each sentence, and a bottom margin to all but the last paragraph
          <p key={i} className={i < arr.length - 1 ? "mb-4" : ""}>
            {sentence.trim()}.
          </p>
        ))}
      </div>
    </div>
  );
}
