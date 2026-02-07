import React, { useState, useEffect } from 'react';
import LearnerNavbar from '../../components/navigation/LearnerNavbar';
import FilterPanel from './components/FilterPanel';
import CourseGrid from './components/CourseGrid';
import EnrollmentModal from './components/EnrollmentModal';
import Icon from '../../components/AppIcon';


const LearnerCoursesListing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([1, 3, 7]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    levels: [],
    priceRange: 'all',
    sortBy: 'popularity'
  });

  const mockCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp 2026",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      thumbnailAlt: "Modern laptop displaying colorful code editor with HTML CSS JavaScript on dark wooden desk with coffee cup",
      category: "Web Development",
      instructorName: "Sarah Johnson",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      instructorAvatarAlt: "Professional headshot of Caucasian woman with shoulder-length brown hair in navy blazer smiling warmly",
      rating: 4.8,
      reviewCount: 12847,
      duration: "42 hours",
      enrolledCount: "45,230",
      level: "Beginner",
      price: 89.99,
      originalPrice: 199.99,
      progress: 35,
      isNew: false,
      learningPoints: [
        "Build 15+ real-world projects including e-commerce sites and web applications",
        "Master HTML5, CSS3, JavaScript ES6+, React, Node.js, and MongoDB",
        "Learn responsive design principles and mobile-first development",
        "Understand Git version control and deployment to production servers"],

      prerequisites: []
    },
    {
      id: 2,
      title: "Machine Learning A-Z: Hands-On Python & R",
      thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
      thumbnailAlt: "Digital visualization of neural network with glowing blue nodes and connections on dark background representing AI",
      category: "Data Science",
      instructorName: "Dr. Michael Chen",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      instructorAvatarAlt: "Professional headshot of Asian man with short black hair wearing glasses and gray suit jacket",
      rating: 4.9,
      reviewCount: 28934,
      duration: "44 hours",
      enrolledCount: "67,890",
      level: "Intermediate",
      price: 94.99,
      originalPrice: 179.99,
      progress: 0,
      isNew: true,
      learningPoints: [
        "Master Machine Learning algorithms including regression, classification, and clustering",
        "Build predictive models using Python scikit-learn and R programming",
        "Implement deep learning with TensorFlow and neural networks",
        "Work with real datasets and solve practical business problems"],

      prerequisites: ["Basic Python programming knowledge", "Understanding of basic mathematics and statistics"]
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass: Figma & Adobe XD",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      thumbnailAlt: "Designer workspace with tablet showing colorful UI mockups, stylus pen, color swatches and coffee on white desk",
      category: "Design",
      instructorName: "Emma Rodriguez",
      instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      instructorAvatarAlt: "Professional headshot of Hispanic woman with long dark hair in black turtleneck with creative studio background",
      rating: 4.7,
      reviewCount: 15623,
      duration: "28 hours",
      enrolledCount: "32,450",
      level: "Beginner",
      price: 79.99,
      originalPrice: 149.99,
      progress: 62,
      isNew: false,
      learningPoints: [
        "Design beautiful user interfaces from scratch using Figma and Adobe XD",
        "Conduct user research and create user personas and journey maps",
        "Build interactive prototypes and conduct usability testing",
        "Learn design systems, component libraries, and handoff to developers"],

      prerequisites: []
    },
    {
      id: 4,
      title: "AWS Certified Solutions Architect 2026",
      thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf",
      thumbnailAlt: "Modern data center with rows of blue-lit server racks and network cables in professional facility",
      category: "Cloud Computing",
      instructorName: "James Wilson",
      instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      instructorAvatarAlt: "Professional headshot of African American man with short hair in white shirt and blue tie smiling confidently",
      rating: 4.8,
      reviewCount: 19847,
      duration: "38 hours",
      enrolledCount: "41,230",
      level: "Advanced",
      price: 99.99,
      originalPrice: 189.99,
      progress: 0,
      isNew: true,
      learningPoints: [
        "Master AWS core services including EC2, S3, RDS, Lambda, and VPC",
        "Design highly available and fault-tolerant architectures",
        "Implement security best practices and IAM policies",
        "Prepare for AWS Solutions Architect Associate certification exam"],

      prerequisites: ["Basic understanding of networking concepts", "Experience with Linux command line"]
    },
    {
      id: 5,
      title: "Digital Marketing Mastery: SEO, Social Media & Ads",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      thumbnailAlt: "Marketing analytics dashboard on laptop screen showing colorful graphs charts and social media metrics",
      category: "Marketing",
      instructorName: "Lisa Anderson",
      instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      instructorAvatarAlt: "Professional headshot of Caucasian woman with blonde hair in red blazer with modern office background",
      rating: 4.6,
      reviewCount: 11234,
      duration: "32 hours",
      enrolledCount: "28,670",
      level: "Beginner",
      price: 0,
      originalPrice: null,
      progress: 0,
      isNew: false,
      learningPoints: [
        "Master SEO techniques to rank websites on Google first page",
        "Create effective social media marketing campaigns across platforms",
        "Run profitable Google Ads and Facebook Ads campaigns",
        "Analyze marketing data and optimize conversion rates"],

      prerequisites: []
    },
    {
      id: 6,
      title: "iOS App Development with Swift 5 & SwiftUI",
      thumbnail: "https://images.unsplash.com/photo-1704230972797-e0e3aba0fce7",
      thumbnailAlt: "iPhone displaying colorful mobile app interface on wooden desk with MacBook and Apple Watch nearby",
      category: "Mobile Development",
      instructorName: "David Kim",
      instructorAvatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0506",
      instructorAvatarAlt: "Professional headshot of Asian man with black hair in casual blue shirt with tech startup office background",
      rating: 4.9,
      reviewCount: 16789,
      duration: "36 hours",
      enrolledCount: "35,890",
      level: "Intermediate",
      price: 89.99,
      originalPrice: 169.99,
      progress: 0,
      isNew: true,
      learningPoints: [
        "Build native iOS apps using Swift 5 and SwiftUI framework",
        "Implement Core Data for local storage and CloudKit for sync",
        "Integrate APIs, push notifications, and in-app purchases",
        "Publish apps to the App Store and manage app lifecycle"],

      prerequisites: ["Basic programming knowledge", "Mac computer with Xcode installed"]
    },
    {
      id: 7,
      title: "Blockchain & Cryptocurrency: Complete Guide",
      thumbnail: "https://images.unsplash.com/photo-1641580562423-6f864d1faa02",
      thumbnailAlt: "Golden Bitcoin cryptocurrency coin on circuit board with glowing blue digital network connections",
      category: "Blockchain",
      instructorName: "Robert Martinez",
      instructorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      instructorAvatarAlt: "Professional headshot of Hispanic man with beard in dark suit jacket with financial district background",
      rating: 4.7,
      reviewCount: 9876,
      duration: "30 hours",
      enrolledCount: "22,340",
      level: "Intermediate",
      price: 94.99,
      originalPrice: 174.99,
      progress: 18,
      isNew: false,
      learningPoints: [
        "Understand blockchain technology and cryptocurrency fundamentals",
        "Build smart contracts using Solidity and deploy on Ethereum",
        "Create decentralized applications (DApps) with Web3.js",
        "Learn about NFTs, DeFi, and emerging blockchain trends"],

      prerequisites: ["Basic JavaScript knowledge", "Understanding of basic cryptography concepts"]
    },
    {
      id: 8,
      title: "Python for Data Science and Machine Learning",
      thumbnail: "https://images.unsplash.com/photo-1618422168439-4b03d3a05b15",
      thumbnailAlt: "Computer screen showing Python code with data visualization graphs and pandas dataframe on dark background",
      category: "Data Science",
      instructorName: "Dr. Jennifer Lee",
      instructorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      instructorAvatarAlt: "Professional headshot of Asian woman with long black hair wearing glasses in white lab coat",
      rating: 4.8,
      reviewCount: 21456,
      duration: "40 hours",
      enrolledCount: "52,780",
      level: "Beginner",
      price: 0,
      originalPrice: null,
      progress: 0,
      isNew: false,
      learningPoints: [
        "Master Python programming for data analysis and visualization",
        "Work with NumPy, Pandas, Matplotlib, and Seaborn libraries",
        "Build machine learning models with scikit-learn",
        "Analyze real-world datasets and create data-driven insights"],

      prerequisites: []
    },
    {
      id: 9,
      title: "Cybersecurity Fundamentals: Ethical Hacking",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      thumbnailAlt: "Digital security concept with glowing padlock icon and binary code on dark blue background with network lines",
      category: "Cybersecurity",
      instructorName: "Alex Thompson",
      instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      instructorAvatarAlt: "Professional headshot of Caucasian man with short brown hair in black shirt with cybersecurity lab background",
      rating: 4.9,
      reviewCount: 14567,
      duration: "35 hours",
      enrolledCount: "29,450",
      level: "Advanced",
      price: 99.99,
      originalPrice: 199.99,
      progress: 0,
      isNew: true,
      learningPoints: [
        "Learn ethical hacking techniques and penetration testing",
        "Master network security, encryption, and security protocols",
        "Identify vulnerabilities and secure systems against attacks",
        "Prepare for CompTIA Security+ and CEH certifications"],

      prerequisites: ["Basic networking knowledge", "Understanding of operating systems"]
    }];


  const categories = [
    { id: 'web-dev', name: 'Web Development', count: 1 },
    { id: 'data-science', name: 'Data Science', count: 2 },
    { id: 'design', name: 'Design', count: 1 },
    { id: 'cloud', name: 'Cloud Computing', count: 1 },
    { id: 'marketing', name: 'Marketing', count: 1 },
    { id: 'mobile', name: 'Mobile Development', count: 1 },
    { id: 'blockchain', name: 'Blockchain', count: 1 },
    { id: 'security', name: 'Cybersecurity', count: 1 }];


  const levels = [
    { id: 'beginner', name: 'Beginner', count: 4 },
    { id: 'intermediate', name: 'Intermediate', count: 3 },
    { id: 'advanced', name: 'Advanced', count: 2 }];


  const priceRanges = [
    { id: 'all', name: 'All Prices', count: 9 },
    { id: 'free', name: 'Free', count: 2 },
    { id: 'under-50', name: 'Under $50', count: 0 },
    { id: '50-100', name: '$50 - $100', count: 6 },
    { id: 'over-100', name: 'Over $100', count: 1 }];


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filterCourses = () => {
    let filtered = [...mockCourses];

    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter((course) =>
        course?.title?.toLowerCase()?.includes(searchLower) ||
        course?.instructorName?.toLowerCase()?.includes(searchLower) ||
        course?.category?.toLowerCase()?.includes(searchLower)
      );
    }

    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter((course) => {
        const categoryMap = {
          'web-dev': 'Web Development',
          'data-science': 'Data Science',
          'design': 'Design',
          'cloud': 'Cloud Computing',
          'marketing': 'Marketing',
          'mobile': 'Mobile Development',
          'blockchain': 'Blockchain',
          'security': 'Cybersecurity'
        };
        return filters?.categories?.some((catId) => categoryMap?.[catId] === course?.category);
      });
    }

    if (filters?.levels?.length > 0) {
      filtered = filtered?.filter((course) =>
        filters?.levels?.some((level) => level === course?.level?.toLowerCase())
      );
    }

    if (filters?.priceRange !== 'all') {
      filtered = filtered?.filter((course) => {
        switch (filters?.priceRange) {
          case 'free':
            return course?.price === 0;
          case 'under-50':
            return course?.price > 0 && course?.price < 50;
          case '50-100':
            return course?.price >= 50 && course?.price <= 100;
          case 'over-100':
            return course?.price > 100;
          default:
            return true;
        }
      });
    }

    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.isNew - a?.isNew;
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'popularity':
        default:
          return parseInt(b?.enrolledCount?.replace(/,/g, '')) - parseInt(a?.enrolledCount?.replace(/,/g, ''));
      }
    });

    return filtered;
  };

  const filteredCourses = filterCourses();

  const handleEnroll = (courseId) => {
    const course = mockCourses?.find((c) => c?.id === courseId);
    setSelectedCourse(course);
  };

  const handleConfirmEnrollment = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      setEnrolledCourses([...enrolledCourses, selectedCourse?.id]);
      setIsEnrolling(false);
      setSelectedCourse(null);
    }, 1500);
  };

  const handleCancelEnrollment = () => {
    setSelectedCourse(null);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      categories: [],
      levels: [],
      priceRange: 'all',
      sortBy: 'popularity'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Learner Navigation */}
      <LearnerNavbar />

      <main>
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Discover Courses
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Explore our comprehensive catalog of courses and start learning today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                categories={categories}
                levels={levels}
                priceRanges={priceRanges}
                courseCount={filteredCourses?.length} />

            </div>

            <div className="lg:col-span-3">
              <CourseGrid
                courses={filteredCourses}
                onEnroll={handleEnroll}
                enrolledCourses={enrolledCourses}
                isLoading={isLoading} />

            </div>
          </div>
        </div>
      </main>
      {selectedCourse &&
        <EnrollmentModal
          course={selectedCourse}
          onConfirm={handleConfirmEnrollment}
          onCancel={handleCancelEnrollment}
          isProcessing={isEnrolling} />

      }
      {showScrollTop &&
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground shadow-elevation-4 flex items-center justify-center hover:shadow-elevation-5 transition-smooth z-50"
          aria-label="Scroll to top">

          <Icon name="ArrowUp" size={24} />
        </button>
      }
    </div>);

};

export default LearnerCoursesListing;