import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../components/ui/Badge';
import { Clock, BookOpen, Eye } from 'lucide-react';
import CourseActions from './CourseActions';

const CourseRow = ({ course }) => {
    const navigate = useNavigate();
    const { title, image, status, views, lessonsCount, duration, tags } = course;
    const statusVariant = status === 'Published' ? 'success' : 'secondary';

    const courseMeta = useMemo(() => {
        return {
            id: course?.id,
            title: course?.title,
            description: course?.description || course?.subtitle || '',
            coverImage: course?.coverImage || course?.image || course?.thumbnail,
            instructor: course?.instructor || course?.instructorName || 'Instructor',
            tags: course?.tags || [],
        };
    }, [course]);

    return (
        <div
            className="group flex items-center justify-between p-4 bg-white border rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() =>
                navigate(`/course/${course.id}`, {
                    state: {
                        from: '/instructor/courses',
                        courseMeta,
                    },
                })
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/course/${course.id}`, {
                        state: {
                            from: '/instructor/courses',
                            courseMeta,
                        },
                    });
                }
            }}
        >
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-base text-foreground truncate group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                        {(tags || []).map((tag) => (
                            <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full border">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-[0.5] flex justify-center px-4">
                <Badge variant={statusVariant} className="capitalize">
                    {status}
                </Badge>
            </div>

            <div className="flex-1 flex items-center justify-between gap-6 px-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Eye size={14} className="text-primary/70" />
                    <span>{views}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-primary/70" />
                    <span>{lessonsCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-primary/70" />
                    <span>{duration}</span>
                </div>
            </div>

            <div className="pl-4 border-l">
                <div onClick={(e) => e.stopPropagation()}>
                    <CourseActions courseId={course.id} />
                </div>
            </div>
        </div>
    );
};

export default CourseRow;
