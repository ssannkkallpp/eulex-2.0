import React from 'react';
import { Story } from '../types';

interface StorySelectionProps {
    stories: Story[];
    onStorySelect: (story: Story) => void;
    getText: (key: string) => string;
}

const StorySelection: React.FC<StorySelectionProps> = ({ stories, onStorySelect, getText }) => {
    return (
        <div className="mb-10">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-['Lato']">
                    {getText('choose-story')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="story-card bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-blue-500 min-h-[200px] flex flex-col justify-between"
                            onClick={() => onStorySelect(story)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">{story.title}</h3>
                                <span className={`difficulty-badge difficulty-${story.difficulty} px-2 py-1 rounded text-xs font-medium`}>
                                    {story.difficulty}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{story.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{story.wordCount} {getText('words')}</span>
                                <span>{getText('est-time').replace('{time}', story.readingTime.toString())}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StorySelection; 