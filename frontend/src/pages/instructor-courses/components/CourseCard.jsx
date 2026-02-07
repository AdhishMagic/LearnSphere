import React from 'react';
import Badge from '../../../components/ui/Badge';
import { Clock, BookOpen, Eye } from 'lucide-react';
import CourseActions from './CourseActions';

const CourseCard = ({ course }) => {
    const { title, image, status, views, lessonsCount, duration, tags } = course;

    const statusVariant = status === 'Published' ? 'success' : 'secondary';

    return (
        <div className="group flex flex-col border rounded-xl bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 h-full">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold shadow-sm">
                    <Badge variant={statusVariant} className="bg-transparent p-0 shadow-none border-0">
                        {status}
                    </Badge>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-primary/80 bg-primary/5 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mt-auto pt-4 border-t border-dashed">
                    <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
                            <Eye size={14} className="text-primary/60" /> {views}
                        </span>
                        <span>Views</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l pl-3">
                        <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
                            <BookOpen size={14} className="text-primary/60" /> {lessonsCount}
                        </span>
                        <span>Lessons</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l pl-3">
                        <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
                            <Clock size={14} className="text-primary/60" /> {duration}
                        </span>
                        <span>Duration</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Last updated 2 days ago</span>
                    <div className="flex gap-2">
                        <CourseActions courseId={course.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
