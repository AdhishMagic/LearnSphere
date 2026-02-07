import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({
  filters,
  onFilterChange,
  onResetFilters,
  categories,
  levels,
  priceRanges,
  courseCount
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleCategoryChange = (categoryId) => {
    const newCategories = filters?.categories?.includes(categoryId)
      ? filters?.categories?.filter(id => id !== categoryId)
      : [...filters?.categories, categoryId];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleLevelChange = (levelId) => {
    const newLevels = filters?.levels?.includes(levelId)
      ? filters?.levels?.filter(id => id !== levelId)
      : [...filters?.levels, levelId];
    onFilterChange({ ...filters, levels: newLevels });
  };

  const handlePriceChange = (priceId) => {
    onFilterChange({ ...filters, priceRange: priceId });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e?.target?.value });
  };

  const handleSortChange = (value) => {
    onFilterChange({ ...filters, sortBy: value });
  };

  const hasActiveFilters = filters?.categories?.length > 0 || 
                          filters?.levels?.length > 0 || 
                          filters?.priceRange !== 'all' ||
                          filters?.search !== '';

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 overflow-hidden">
      <div className="p-4 md:p-5 lg:p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon name="Filter" size={20} color="var(--color-primary)" />
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            {courseCount > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium data-text">
                {courseCount} courses
              </span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search courses..."
              value={filters?.search}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <div className="w-full lg:w-64">
            <Select
              options={sortOptions}
              value={filters?.sortBy}
              onChange={handleSortChange}
              placeholder="Sort by"
            />
          </div>
        </div>
      </div>
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 md:p-5 lg:p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="FolderOpen" size={16} />
              Categories
            </h3>
            <CheckboxGroup>
              {categories?.map((category) => (
                <Checkbox
                  key={category?.id}
                  label={`${category?.name} (${category?.count})`}
                  checked={filters?.categories?.includes(category?.id)}
                  onChange={() => handleCategoryChange(category?.id)}
                  size="sm"
                />
              ))}
            </CheckboxGroup>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              Difficulty Level
            </h3>
            <CheckboxGroup>
              {levels?.map((level) => (
                <Checkbox
                  key={level?.id}
                  label={`${level?.name} (${level?.count})`}
                  checked={filters?.levels?.includes(level?.id)}
                  onChange={() => handleLevelChange(level?.id)}
                  size="sm"
                />
              ))}
            </CheckboxGroup>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="DollarSign" size={16} />
              Price Range
            </h3>
            <CheckboxGroup>
              {priceRanges?.map((range) => (
                <Checkbox
                  key={range?.id}
                  label={`${range?.name} (${range?.count})`}
                  checked={filters?.priceRange === range?.id}
                  onChange={() => handlePriceChange(range?.id)}
                  size="sm"
                />
              ))}
            </CheckboxGroup>
          </div>

          {hasActiveFilters && (
            <div className="border-t border-border pt-6">
              <Button
                variant="outline"
                fullWidth
                onClick={onResetFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;