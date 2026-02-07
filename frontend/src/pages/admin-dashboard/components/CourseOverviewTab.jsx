import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseOverviewTab = () => {
  const courseStats = {
    totalCourses: 1247,
    activeCourses: 892,
    pendingApproval: 23,
    draftCourses: 332,
    topPerformingCourses: [
      {
        id: 1,
        title: "Advanced React Development",
        instructor: "Dr. Sarah Mitchell",
        enrollments: 3456,
        rating: 4.8,
        revenue: 86400,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        imageAlt: "Modern laptop displaying colorful React code editor with component structure on dark background"
      },
      {
        id: 2,
        title: "Machine Learning Fundamentals",
        instructor: "Prof. James Chen",
        enrollments: 2987,
        rating: 4.9,
        revenue: 74675,
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
        imageAlt: "Digital neural network visualization with glowing blue nodes and connections representing machine learning algorithms"
      },
      {
        id: 3,
        title: "Full Stack Web Development",
        instructor: "Maria Rodriguez",
        enrollments: 2654,
        rating: 4.7,
        revenue: 66350,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        imageAlt: "Multiple computer monitors showing various web development interfaces with code and design mockups in modern office"
      }],

    pendingApprovals: [
      {
        id: 1,
        title: "Introduction to Blockchain Technology",
        instructor: "Alex Thompson",
        submittedDate: "02/05/2026",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1649682892309-e10e0b7cd40b",
        imageAlt: "Abstract digital blockchain network with golden cryptocurrency coins and glowing connection lines on dark blue background"
      },
      {
        id: 2,
        title: "Digital Marketing Strategies 2026",
        instructor: "Emily Watson",
        submittedDate: "02/06/2026",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        imageAlt: "Business team analyzing digital marketing data on large screen with colorful charts and graphs in modern conference room"
      }],

    categoryDistribution: [
      { category: "Technology", count: 456, percentage: 36.6 },
      { category: "Business", count: 298, percentage: 23.9 },
      { category: "Design", count: 234, percentage: 18.8 },
      { category: "Marketing", count: 156, percentage: 12.5 },
      { category: "Others", count: 103, percentage: 8.2 }]

  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Course Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="var(--color-primary)" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 data-text">
            {courseStats?.totalCourses?.toLocaleString()}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">Total Courses</p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 data-text">
            {courseStats?.activeCourses?.toLocaleString()}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">Active Courses</p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
            </div>
            <span className="text-xs md:text-sm font-medium text-warning bg-warning/10 px-2 py-1 rounded-md">
              Pending
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 data-text">
            {courseStats?.pendingApproval}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">Pending Approval</p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted/50 flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 data-text">
            {courseStats?.draftCourses}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">Draft Courses</p>
        </div>
      </div>
      {/* Top Performing Courses */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Top Performing Courses</h3>
          <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
        </div>
        <div className="space-y-4 md:space-y-6">
          {courseStats?.topPerformingCourses?.map((course) =>
            <div key={course?.id} className="flex flex-col md:flex-row gap-4 p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="w-full md:w-32 h-32 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={course?.image}
                  alt={course?.imageAlt}
                  className="w-full h-full object-cover" />

              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2 line-clamp-1">
                  {course?.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                  by {course?.instructor}
                </p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={14} className="text-primary" />
                    <span className="text-xs md:text-sm font-medium text-foreground data-text">
                      {course?.enrollments?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-accent" />
                    <span className="text-xs md:text-sm font-medium text-foreground data-text">
                      {course?.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="DollarSign" size={14} className="text-success" />
                    <span className="text-xs md:text-sm font-semibold text-success data-text">
                      ${course?.revenue?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Pending Approvals and Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Pending Approvals */}
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Pending Approvals</h3>
            <span className="text-xs md:text-sm font-medium text-warning bg-warning/10 px-2 md:px-3 py-1 rounded-md">
              {courseStats?.pendingApproval} Pending
            </span>
          </div>
          <div className="space-y-4">
            {courseStats?.pendingApprovals?.map((course) =>
              <div key={course?.id} className="flex flex-col sm:flex-row gap-3 p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={course?.image}
                    alt={course?.imageAlt}
                    className="w-full h-full object-cover" />

                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 line-clamp-2">
                    {course?.title}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">
                    by {course?.instructor}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {course?.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Submitted: {course?.submittedDate}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default" size="xs">
                      Approve
                    </Button>
                    <Button variant="outline" size="xs">
                      Review
                    </Button>
                    <Button variant="destructive" size="xs">
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Category Distribution</h3>
            <Icon name="LayoutGrid" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-4 md:space-y-5">
            {courseStats?.categoryDistribution?.map((category, index) =>
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base font-medium text-foreground">
                    {category?.category}
                  </span>
                  <span className="text-sm md:text-base font-semibold text-foreground data-text">
                    {category?.count} ({category?.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 md:h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${category?.percentage}%` }} />

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default CourseOverviewTab;