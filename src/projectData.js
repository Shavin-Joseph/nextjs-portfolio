// This is where you'll manage your projects.
// Replace the placeholder 'image' URLs with actual screenshots of your projects for the best result.
import ac_traccker_Image from "@/assets/ac_service_tracker.png";
import spicera_Image from "@/assets/spicera.png";
import royj_tailors_Image from "@/assets/royj_tailors.png";


export const projects = [
  {
    id: 1,
    title: "AC Service & Management Platform",
    category: "Full-Stack Application",
    description: "Developed a comprehensive full stack application for an AC service provider to streamline their entire workflow. The platform tracks service requests and manages technician schedules. resulting in a significant improvement in operational efficiency.",
    tags: ["React", "Python", "Full-Stack", "REST API", "Database Management"],
    image: ac_traccker_Image

  },
  {
    id: 2,
    title: "Spicera.store - E-Commerce Website",
    category: "E-Commerce Development",
    description: "Designed and developed a vibrant and user-friendly e-commerce platform for an online spice merchant. The site features a clean product catalog, secure payment gateway integration with Stripe, and a fully responsive design for a seamless shopping experience on mobile and desktop.",
    tags: ["E-Commerce", "React", "UI/UX", "Responsive Design", "Payment Gateway"],
    image: spicera_Image

  },
  {
    id: 3,
    title: "Roy J Tailors - Bespoke Tailoring Website",
    category: "Web Design & Development",
    description: "Created an elegant and professional online presence for a bespoke tailoring business. This project focused on showcasing high-quality craftsmanship through a clean visual gallery and simplifying the client consultation process with an integrated contact and appointment-request form.",
    tags: ["Web Design", "UI/UX", "Small Business", "Responsive"],
    image: royj_tailors_Image

  },
];