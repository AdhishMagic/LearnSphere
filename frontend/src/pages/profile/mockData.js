// Mock user data for different roles
export const mockUsers = {
    learner: {
        id: 'user-001',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        bio: 'Passionate learner exploring web development and data science.',
        location: 'San Francisco, CA',
        role: 'learner',
        joinedDate: '2024-01-15',
        coursesEnrolled: 5,
        coursesCompleted: 2,
        totalPoints: 1250,
        // Instructor application data (empty for regular learner)
        instructorApplication: null
    },
    instructor: {
        id: 'user-002',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 987-6543',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        bio: 'Experienced software engineer and educator with 10+ years in the industry.',
        location: 'New York, NY',
        role: 'instructor',
        joinedDate: '2023-06-20',
        coursesEnrolled: 3,
        coursesCompleted: 3,
        totalPoints: 2500,
        // Instructor specific data
        instructorData: {
            degree: 'M.S. Computer Science',
            institution: 'MIT',
            yearsOfExperience: 10,
            specializations: ['Web Development', 'React', 'Node.js'],
            certifications: ['AWS Certified', 'Google Cloud Professional'],
            linkedIn: 'https://linkedin.com/in/sarahjohnson',
            portfolio: 'https://sarahjohnson.dev',
            coursesCreated: 5,
            totalStudents: 12500,
            averageRating: 4.8
        }
    },
    admin: {
        id: 'user-003',
        firstName: 'Michael',
        lastName: 'Admin',
        email: 'admin@learnsphere.com',
        phone: '+1 (555) 000-0000',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        bio: 'Platform administrator ensuring smooth operations.',
        location: 'Austin, TX',
        role: 'admin',
        joinedDate: '2022-01-01',
        adminLevel: 'Super Admin',
        permissions: ['users', 'courses', 'analytics', 'reports', 'system']
    }
};

// Degree options for instructor application
export const degreeOptions = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Ph.D.',
    'Professional Certification',
    'Other'
];

// Specialization options
export const specializationOptions = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'UI/UX Design',
    'Project Management',
    'Digital Marketing',
    'Business Analytics',
    'Blockchain',
    'Game Development',
    'Other'
];

// Experience year options
export const experienceOptions = [
    { value: '0-1', label: 'Less than 1 year' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
];

// Mock instructor courses data
export const mockInstructorCourses = [
    {
        id: 'course-001',
        title: 'Complete React Development Bootcamp',
        description: 'Learn React from scratch with hands-on projects',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        status: 'published',
        students: 4250,
        rating: 4.9,
        reviews: 856,
        price: 89.99,
        createdAt: '2024-08-15',
        lastUpdated: '2025-01-20',
        category: 'Web Development'
    },
    {
        id: 'course-002',
        title: 'Node.js & Express Masterclass',
        description: 'Build scalable backend applications with Node.js',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
        status: 'published',
        students: 3180,
        rating: 4.7,
        reviews: 542,
        price: 79.99,
        createdAt: '2024-06-10',
        lastUpdated: '2025-01-15',
        category: 'Backend Development'
    },
    {
        id: 'course-003',
        title: 'Advanced TypeScript Patterns',
        description: 'Master TypeScript with advanced patterns and best practices',
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
        status: 'draft',
        students: 0,
        rating: 0,
        reviews: 0,
        price: 69.99,
        createdAt: '2025-01-25',
        lastUpdated: '2025-02-01',
        category: 'Programming'
    },
    {
        id: 'course-004',
        title: 'Full-Stack JavaScript Development',
        description: 'Become a full-stack developer with MERN stack',
        thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400',
        status: 'pending_review',
        students: 0,
        rating: 0,
        reviews: 0,
        price: 129.99,
        createdAt: '2025-02-01',
        lastUpdated: '2025-02-05',
        category: 'Full Stack'
    },
    {
        id: 'course-005',
        title: 'GraphQL API Design',
        description: 'Design and build modern APIs with GraphQL',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
        status: 'published',
        students: 2150,
        rating: 4.8,
        reviews: 389,
        price: 59.99,
        createdAt: '2024-09-20',
        lastUpdated: '2024-12-10',
        category: 'API Development'
    }
];

// Course status configuration
export const courseStatusConfig = {
    published: {
        label: 'Published',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: 'CheckCircle'
    },
    draft: {
        label: 'Draft',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: 'FileEdit'
    },
    pending_review: {
        label: 'Pending Review',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: 'Clock'
    },
    archived: {
        label: 'Archived',
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: 'Archive'
    }
};
