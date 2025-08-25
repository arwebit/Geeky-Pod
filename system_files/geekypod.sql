-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2025 at 04:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `geekypod`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `about_id` int(11) NOT NULL,
  `about_me` longtext NOT NULL,
  `about_pic` varchar(200) NOT NULL,
  `about_button_text` varchar(20) DEFAULT NULL,
  `about_button_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`about_id`, `about_me`, `about_pic`, `about_button_text`, `about_button_link`) VALUES
(1, 'Hi, I\'m Manash , and I\'m the host of the \"The Geeky Pod\" podcast, where I delve into the world of careers and the experiences that come with them. With a background in Software Industry, I have a unique perspective on navigating the job market and making the most of your professional journey. Each episode, I bring on guests from diverse industries to share their own experiences and offer insights and advice to help listeners grow in their careers. Whether you\'re just starting out or looking to make a change, my goal is to provide a platform for inspiration, growth, and learning. Join me!\r\n', 'about/20240821112921.jpg', 'Read more', 'http://thegeekypod.in/');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` bigint(20) NOT NULL,
  `google_form_link` text NOT NULL,
  `contact_email` varchar(200) NOT NULL,
  `address` varchar(255) NOT NULL,
  `mobile_no` bigint(10) NOT NULL,
  `instagram_link` text DEFAULT NULL,
  `youtube_link` text DEFAULT NULL,
  `spotify_link` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `google_form_link`, `contact_email`, `address`, `mobile_no`, `instagram_link`, `youtube_link`, `spotify_link`) VALUES
(1, 'https://forms.gle/q3KF35iJDZhnk5Em9', 'manashnita2011@gmail.com', 'Agartala, Tripura', 9962418185, 'https://www.instagram.com/thegeekypod/', 'https://www.youtube.com/@thegeekypod', 'https://open.spotify.com/show/5L7wYgEy2skYWp0rJosHXq?si=8ae92170a5b347f1');

-- --------------------------------------------------------

--
-- Table structure for table `episode_lists`
--

CREATE TABLE `episode_lists` (
  `episode_id` bigint(38) NOT NULL,
  `episode_season` varchar(30) NOT NULL,
  `episode_no` varchar(200) NOT NULL,
  `episode_title` varchar(255) NOT NULL,
  `episode_title_slug` varchar(255) NOT NULL,
  `episode_description` varchar(255) NOT NULL,
  `episode_image` longtext NOT NULL,
  `podcaster_id` bigint(38) NOT NULL,
  `genre_id` bigint(38) NOT NULL,
  `episode_spotify_link` varchar(255) DEFAULT NULL,
  `episode_youtube_link` varchar(255) NOT NULL,
  `episode_date` date NOT NULL,
  `is_popular` enum('yes','no') NOT NULL,
  `is_active` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `episode_lists`
--

INSERT INTO `episode_lists` (`episode_id`, `episode_season`, `episode_no`, `episode_title`, `episode_title_slug`, `episode_description`, `episode_image`, `podcaster_id`, `genre_id`, `episode_spotify_link`, `episode_youtube_link`, `episode_date`, `is_popular`, `is_active`) VALUES
(1, '1', '42', 'What Men in IT Don’t Know About Women’s Struggles | The Geeky Pod | E42', 'what-men-in-it-don-t-know-about-women-s-struggles-the-geeky-pod-e42', 'In this episode, we delve deep into the challenges and triumphs of women in the IT sector in India. Join us as we explore the unique experiences, hurdles, and successes of women navigating the dynamic and often challenging world of information technology.', 'episodes/20240815120449.jpg', 1, 2, 'https://open.spotify.com/episode/4zafgZfGwAFzHFBHmn3yWG?si=65d857e4852c4a42', 'https://www.youtube.com/watch?v=_0TGT2bgt-U', '2024-05-29', 'yes', 'yes'),
(2, '1', '46', 'Tipra Motha, Tipraland, Political Journey and more| TheGeekyPod | EP #46', 'tipra-motha-tipraland-political-journey-and-more-thegeekypod-ep-46', 'In this exclusive podcast, we sit down with Mr. Suhel Debbarma, an Executive Member & Minister of the TTAADC (Tripura Tribal Areas Autonomous District Council), discusses his incredible journey from a young engineer to a visionary leader.', 'episodes/20250116195511.png', 1, 6, 'https://yt.openinapp.co/izwk4', 'https://yt.openinapp.co/izwk4', '2025-01-16', 'yes', 'yes'),
(3, '1', '45', 'How Hard Is It to Get Rank 3 in TPSC? Hear From a Topper! |TheGeekyPod | EP #45 | #tpsc  #tcs #upsc', 'how-hard-is-it-to-get-rank-3-in-tpsc-hear-from-a-topper-thegeekypod-ep-45-tpsc-tcs-upsc', 'In this episode, we have the privilege of hosting Nilajana Bhattacharjee, who secured an incredible Rank 3 in the Tripura Civil Services Examination (TPSC) 2024! ', 'episodes/20250116200003.png', 1, 1, '', 'https://yt.openinapp.co/llpmh', '2024-10-26', 'no', 'yes'),
(4, '1', '8', 'How To Be An Industry Ready Engineer?', 'how-to-be-an-industry-ready-engineer-', 'Dr. Basuraj Bhowmik is an Assistant Professor in the Department of Civil Engineering at the IIT BHU. He received his Ph.D. in Structural Engineering from the IIT Guwahati and graduated from NIT Agartala with a B.Tech in Civil Engineering.', 'episodes/20250116200244.png', 1, 4, '', 'https://youtu.be/j2u52GD6-YI', '2023-03-16', 'no', 'yes'),
(5, '1', '4', 'Movies, Reviews , Film Making and More with  @aritrasgyan | The Geeky Pod', 'movies-reviews-film-making-and-more-with-aritrasgyan-the-geeky-pod', 'Aritra Banerjee is an Indian YouTuber, Film Critic, Writer and Director. He has amassed over 140K+ followers on youtube. He is the biggest bengali film critic on youtube.', 'episodes/20250116200855.png', 1, 3, 'https://youtu.be/_zBoO1MaTFw', 'https://youtu.be/_zBoO1MaTFw', '2023-02-23', 'yes', 'yes'),
(6, '1', '25', 'Exploring the World of Food Blogging: Insights, Tips and Inspirations | E25', 'exploring-the-world-of-food-blogging-insights-tips-and-inspirations-e25', 'In this video, we talk to popular food blogger who shared her insights, tips, and success stories on how to make it big in the competitive world of food blogging.', 'episodes/20250116201419.jpg', 1, 3, 'https://youtu.be/vYy4EFnStGQ', 'https://youtu.be/vYy4EFnStGQ', '2023-03-29', 'yes', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `genre_lists`
--

CREATE TABLE `genre_lists` (
  `genre_id` bigint(38) NOT NULL,
  `genre_name` varchar(255) NOT NULL,
  `genre_slug` varchar(255) NOT NULL,
  `genre_image` varchar(200) NOT NULL,
  `is_popular` enum('yes','no') NOT NULL,
  `is_active` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `genre_lists`
--

INSERT INTO `genre_lists` (`genre_id`, `genre_name`, `genre_slug`, `genre_image`, `is_popular`, `is_active`) VALUES
(1, 'Civil Services', 'civil-services', 'genres/20240815105818.jpg', 'yes', 'yes'),
(2, 'Software & Startups', 'software-startups', 'genres/20240815110316.jpg', 'yes', 'yes'),
(3, 'Movies and More', 'movies-and-more', 'genres/20240815110401.jpg', 'yes', 'yes'),
(4, 'PhD and Higher Studies', 'phd-and-higher-studies', 'genres/20240815110457.jpg', 'yes', 'yes'),
(5, 'Indian Army, Navy & Airforce ', 'indian-army-navy-airforce-', 'genres/20240815110803.jpg', 'yes', 'yes'),
(6, 'Career Building', 'career-building', 'genres/20240815110847.jpg', 'yes', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `podcaster_lists`
--

CREATE TABLE `podcaster_lists` (
  `podcaster_id` bigint(38) NOT NULL,
  `podcaster_full_name` varchar(255) NOT NULL,
  `podcaster_slug` varchar(255) NOT NULL,
  `podcaster_image` varchar(150) DEFAULT NULL,
  `podcaster_bio` varchar(200) DEFAULT NULL,
  `podcaster_designation` varchar(50) NOT NULL,
  `podcaster_popular` enum('yes','no') NOT NULL,
  `is_active` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `podcaster_lists`
--

INSERT INTO `podcaster_lists` (`podcaster_id`, `podcaster_full_name`, `podcaster_slug`, `podcaster_image`, `podcaster_bio`, `podcaster_designation`, `podcaster_popular`, `is_active`) VALUES
(1, 'Manash Chakraborty', 'manash-chakraborty', 'podcasters/20240815113200.jpg', 'Manash Chakraborty', 'Owner- the geeky pod', 'yes', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `slider_lists`
--

CREATE TABLE `slider_lists` (
  `slider_id` bigint(38) NOT NULL,
  `slider_image` varchar(150) NOT NULL,
  `slider_button_text` varchar(20) DEFAULT NULL,
  `slider_button_url` varchar(150) DEFAULT NULL,
  `slider_header_text` varchar(20) DEFAULT NULL,
  `slider_para_text` varchar(100) DEFAULT NULL,
  `is_active` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `slider_lists`
--

INSERT INTO `slider_lists` (`slider_id`, `slider_image`, `slider_button_text`, `slider_button_url`, `slider_header_text`, `slider_para_text`, `is_active`) VALUES
(3, 'sliders/20240815114413.jpg', 'New Episode', 'https://yt.openinapp.co/izwk4', '', '', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber_lists`
--

CREATE TABLE `subscriber_lists` (
  `subscriber_id` bigint(38) NOT NULL,
  `subscriber_email` varchar(150) NOT NULL,
  `registered_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `subscriber_lists`
--

INSERT INTO `subscriber_lists` (`subscriber_id`, `subscriber_email`, `registered_date`) VALUES
(1, 'arwebcs@gmail.com', '2024-06-29 18:20:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_id` bigint(14) NOT NULL,
  `full_name` varchar(200) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(70) NOT NULL,
  `ptext` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_id`, `full_name`, `username`, `password`, `ptext`, `status`) VALUES
(1, 'Manash Chakraborty', 'admin', '$2y$12$EuPxF/Ov35qUdZrlGflvS.9LDvd0HmQoySyKmW2u2VQzxMqTRRyKm', 'Welcome@01', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`about_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `episode_lists`
--
ALTER TABLE `episode_lists`
  ADD PRIMARY KEY (`episode_id`);

--
-- Indexes for table `genre_lists`
--
ALTER TABLE `genre_lists`
  ADD PRIMARY KEY (`genre_id`),
  ADD UNIQUE KEY `category_name` (`genre_name`),
  ADD UNIQUE KEY `category_slug` (`genre_slug`);

--
-- Indexes for table `podcaster_lists`
--
ALTER TABLE `podcaster_lists`
  ADD PRIMARY KEY (`podcaster_id`);

--
-- Indexes for table `slider_lists`
--
ALTER TABLE `slider_lists`
  ADD PRIMARY KEY (`slider_id`);

--
-- Indexes for table `subscriber_lists`
--
ALTER TABLE `subscriber_lists`
  ADD PRIMARY KEY (`subscriber_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `episode_lists`
--
ALTER TABLE `episode_lists`
  MODIFY `episode_id` bigint(38) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `genre_lists`
--
ALTER TABLE `genre_lists`
  MODIFY `genre_id` bigint(38) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `podcaster_lists`
--
ALTER TABLE `podcaster_lists`
  MODIFY `podcaster_id` bigint(38) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `slider_lists`
--
ALTER TABLE `slider_lists`
  MODIFY `slider_id` bigint(38) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscriber_lists`
--
ALTER TABLE `subscriber_lists`
  MODIFY `subscriber_id` bigint(38) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_id` bigint(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20230215001359;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
