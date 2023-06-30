import "../pages/BlogPage.css";
import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import BlogPageQualityCard from '../components/BlogPageQualityCard';
import BlogPageProtectionCard from '../components/BlogPageProtectionCard';
import BlogPageEducationCard from "../components/BlogPageEducationCard";
import BlogPageFutureCard  from "../components/BlogPageFutureCard";

export default function BlogPage() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname]);

    return(
        <div>
            <div className="blogHeadlineContainer">
                <span className="blogHeadline">WATER HUB</span>
            </div>
            <div className="blogHeroSpanContainer">
                <span className="blogHeroSpan">Discover the fascinating world of water and </span>
                <span className="blogHeroSpan">explore its wonders on our insightful hub. </span>
                <span className="blogHeroSpan">Dive into captivating articles, tips for </span>
                <span className="blogHeroSpan">conservation, and the latest discoveries </span>
                <span className="blogHeroSpan">in water-related topics.</span>
            </div>
                <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="cardWrapper">
                        <Link to="/article" className="linkWithoutUnderline">
                            <BlogPageQualityCard />
                        </Link>
                    </div>
                    <div className="cardWrapper">
                        <Link to="/article" className="linkWithoutUnderline">
                            <BlogPageEducationCard />
                        </Link>
                    </div>
                    <div className="cardWrapper">
                        <Link to="/article" className="linkWithoutUnderline">
                            <BlogPageProtectionCard />
                        </Link>
                    </div>
                    <div className="cardWrapper">
                        <Link to="/article" className="linkWithoutUnderline">
                            <BlogPageFutureCard />
                        </Link>
                    </div>
                </Container>
                <div className="blogButtonContainer">
                    <Link to="/blog" className="buttonLink">
                        <button className="yellowButton">VIEW ALL</button>
                    </Link>
                </div>
            </div>
    )
};