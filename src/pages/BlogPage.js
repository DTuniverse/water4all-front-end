import "../pages/BlogPage.css";
import React from "react";
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

export default function BlogPage() {
    return(
        <div>
            <div className="blogHeadlineContainer">
                <span className="blogHeadline">WATER BLOG</span>
            </div>
            <div className="blogHeroSpanContainer">
                <span className="blogHeroSpan">Discover the fascinating world of water and </span>
                <span className="blogHeroSpan">explore its wonders on our insightful blog. </span>
                <span className="blogHeroSpan">Dive into captivating articles, tips for </span>
                <span className="blogHeroSpan">conservation, and the latest discoveries </span>
                <span className="blogHeroSpan">in water-related topics.</span>
            </div>
        </div>
        
    )
};