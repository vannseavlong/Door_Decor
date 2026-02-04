"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { useTranslate } from "@/lib/utils/useTranslate";
import { localizePath } from "@/lib/utils/localizePath";

type BlogItem = {
  id: string;
  title: string;
  title_km?: string;
  description: string;
  description_km?: string;
  image: string;
  tag?: string;
  quote?: string;
  href?: string;
  category?: string;
  location?: string;
  date?: string;
};

const DEFAULT_POSTS: BlogItem[] = [
  {
    id: "1",
    title: "Modern Teak Door Installed in Siem Reap Villa",
    description:
      "A warm teak door that complements the open-plan villa and enhances curb appeal.",
    image: "/product/villa1/3B-01.webp",
    tag: "Residential",
    href: "/",
  },
  {
    id: "2",
    title: "Contemporary Steel Door for Phnom Penh Office",
    description:
      "High-security steel door with a premium finish for a modern office entrance.",
    image: "/product/villa1/3B-01.webp",
    tag: "Commercial",
    href: "/",
  },
  {
    id: "3",
    title: "Restoration: Classic Wooden Door",
    description:
      "Refinishing and reinstalling a classic wooden door for a traditional home.",
    image: "/product/villa1/3B-01.webp",
    tag: "Customer Review",
    href: "/",
    quote: "Our house feels like new again — great craftsmanship.",
  },
  {
    id: "4",
    title: "Restoration: Classic Wooden Door",
    description:
      "Refinishing and reinstalling a classic wooden door for a traditional home.",
    image: "/product/villa1/3B-01.webp",
    tag: "Customer Review",
    href: "/",
    quote: "Our house feels like new again — great craftsmanship.",
  },
  {
    id: "5",
    title: "Restoration: Classic Wooden Door",
    description:
      "Refinishing and reinstalling a classic wooden door for a traditional home.",
    image: "/product/villa1/3B-01.webp",
    tag: "Customer Review",
    href: "/",
    quote: "Our house feels like new again — great craftsmanship.",
  },
];

export default function Blog({
  posts = DEFAULT_POSTS,
}: {
  posts?: BlogItem[];
}) {
  const { t, lang } = useTranslate();
  const currentLocale = lang || "kh";
  const featuredPosts = posts.slice(0, 2);
  const regularPosts = posts.slice(2);

  // Helper to get localized text
  const getLocalizedText = (item: BlogItem, field: "title" | "description") => {
    if (currentLocale === "kh" && item[`${field}_km`]) {
      return item[`${field}_km`];
    }
    return item[field];
  };

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto px-4" style={{ maxWidth: 1440 }}>
        <div className="text-center mb-8">
          <h2 className="heading-3 md:heading-2 text-brand-dark font-khmer mb-4">
            {t("blogSectionTitle")}
          </h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto font-khmer">
            {t("blogSectionSubtitle")}
          </p>
        </div>

        {/* Featured Grid - Masonry Style (Hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 mb-6">
          {featuredPosts.map((post, index) => {
            const wrapperClasses =
              "group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300";
            return (
              <div
                key={post.id}
                className={`${wrapperClasses} h-80 md:h-[500px]`}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="inline-block px-3 py-1 bg-brand-primary text-white rounded-full mb-3 w-fit">
                    {post.category || post.tag}
                  </span>
                  <h3 className="text-white mb-3 font-khmer">
                    {getLocalizedText(post, "title")}
                  </h3>
                  <p className="text-gray-200 mb-4 line-clamp-2 font-khmer">
                    {getLocalizedText(post, "description")}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-300">
                      {post.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="font-khmer">{post.location}</span>
                        </div>
                      )}
                      {post.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-khmer">{post.date}</span>
                        </div>
                      )}
                    </div>
                    {post.href && (
                      post.href.startsWith("/") ? (
                        <Link
                          href={localizePath(post.href, currentLocale)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-full transition-colors font-khmer"
                        >
                          {currentLocale === "kh" ? "មើលទ្វារ" : "View Door"}
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      ) : (
                        <a
                          href={post.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-full transition-colors font-khmer"
                        >
                          {currentLocale === "kh" ? "មើលទ្វារ" : "View Door"}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regular Posts - Different Layout */}
        {/* On mobile: show all posts. On desktop: show only regularPosts (first 2 are in featured) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Mobile: all posts */}
          {posts.map((post, index) => (
            <div
              key={`mobile-${post.id}`}
              className={`md:hidden group bg-white rounded-xl overflow-hidden border border-black-300 transition-all duration-300`}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  quality={100}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full">
                    {post.category || post.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-5 mb-2 group-hover:text-brand-primary transition-colors font-khmer">
                  {getLocalizedText(post, "title")}
                </h3>
                <p className="body-base text-gray-600 mb-4 line-clamp-2 font-khmer">
                  {getLocalizedText(post, "description")}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 text-gray-500">
                    {post.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-khmer">{post.location}</span>
                      </div>
                    )}
                    {post.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-khmer">{post.date}</span>
                      </div>
                    )}
                  </div>
                  {post.href && (
                    post.href.startsWith("/") ? (
                      <Link
                        href={localizePath(post.href, currentLocale)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full transition-colors font-khmer text-sm"
                      >
                        {currentLocale === "kh" ? "មើលទ្វារ" : "View Door"}
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full transition-colors font-khmer text-sm"
                      >
                        {currentLocale === "kh" ? "មើលទ្វារ" : "View Door"}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Desktop: only regular posts (featured shown above) */}
          {regularPosts.map((post) => (
            <div
              key={post.id}
              className="hidden md:block group bg-white rounded-xl overflow-hidden border border-black-300 transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  quality={100}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full">
                    {post.category || post.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-5 mb-2 group-hover:text-brand-primary transition-colors font-khmer">
                  {getLocalizedText(post, "title")}
                </h3>
                <p className="body-base text-gray-600 mb-4 line-clamp-2 font-khmer">
                  {getLocalizedText(post, "description")}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 text-gray-500">
                    {post.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-khmer">{post.location}</span>
                      </div>
                    )}
                    {post.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-khmer">{post.date}</span>
                      </div>
                    )}
                  </div>
                  {post.href && (
                    post.href.startsWith("/") ? (
                      <Link
                        href={localizePath(post.href, currentLocale)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full transition-colors font-khmer text-sm"
                      >
                        {currentLocale === "kh" ? "មើលទ្វារ" : "View Door"}
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full transition-colors font-khmer text-sm"
                      >
                        {currentLocale === "kh" ? "មើលទ្វារ" : "View Door"}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {/* <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#f7941d] hover:text-[#f7941d] transition-colors inline-flex items-center gap-2 font-khmer">
            {t("viewAllInstallations")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </section>
  );
}
