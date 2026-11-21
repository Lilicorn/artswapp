CREATE TABLE `user` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(25) UNIQUE NOT NULL,
  `displayname` varchar(20),
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text,
  `profile_url` varchar(500),
  `banner_url` varchar(500),
  `swapslots` int CHECK ( `swapslots` >= 0 and  `swapslots` <=5),
  `avg_rating` decimal(3,2) NOT NULL DEFAULT 0,
  `total_swaps` int,
  `drawing_points` int,
  `display_mode` tinyint,
  `shortcut_left` varchar(30) DEFAULT "ArrowLeft",
  `shortcut_right` varchar(30)DEFAULT "ArrowRight",
  `user_role` tinyint,
  `is_banned` tinyint,
  `payment_details` varchar(255)
);

CREATE TABLE `user_socials` (
  `link_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `platform_name` varchar(50),
  `link_url` varchar(255) NOT NULL
);

CREATE TABLE `tag` (
  `tag_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `user_tag` (
  `connection_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tag_id` int NOT NULL
);

CREATE TABLE `drawing` (
  `drawing_id` int PRIMARY KEY AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `swap_id` int,
  `title` varchar(50),
  `description` varchar(2000),
  `picture_url` varchar(500),
  `points` int,
  `version_num` int NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL
);

CREATE TABLE `swap` (
  `swap_user1` int NOT NULL,
  `swap_user2` int NOT NULL,
  `swap_id` int PRIMARY KEY AUTO_INCREMENT,
  `swap_status` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL,
  `deadline` timestamp NOT NULL,
  `publish_result` tinyint
);

CREATE TABLE `message` (
  `msg_id` int PRIMARY KEY AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `swap_id` int NOT NULL,
  `msg_text` varchar(5000) NOT NULL,
  `sent_at` timestamp NOT NULL,
  `seen` tinyint NOT NULL DEFAULT 0
);

CREATE TABLE `swipe` (
  `swipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `swipe_user1` int NOT NULL,
  `swipe_user2` int NOT NULL,
  `direction` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL
);

CREATE TABLE `swap_rating` (
  `rating_id` int PRIMARY KEY AUTO_INCREMENT,
  `reviewer_id` int NOT NULL,
  `reviewed_id` int NOT NULL,
  `swap_id` int NOT NULL,
  `stars` int NOT NULL,
  `created_at` timestamp NOT NULL
);

CREATE TABLE `auction` (
  `auc_id` int PRIMARY KEY AUTO_INCREMENT,
  `drawing_id` int UNIQUE NOT NULL,
  `starting_price` decimal(10,2) NOT NULL DEFAULT 0,
  `current_price` decimal(10,2) NOT NULL,
  `min_increase` decimal(10,2) NOT NULL DEFAULT 0.5,
  `autobuy_price` decimal(10,2),
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NOT NULL,
  `auction_status` varchar(20) NOT NULL
);

CREATE TABLE `bid` (
  `bid_id` int PRIMARY KEY AUTO_INCREMENT,
  `auc_id` int NOT NULL,
  `user_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `bid_time` timestamp NOT NULL
);

CREATE TABLE `transaction` (
  `trans_id` int PRIMARY KEY AUTO_INCREMENT,
  `auc_id` int UNIQUE NOT NULL,
  `winner_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `fee_percentage` decimal(5,2) NOT NULL DEFAULT 2,
  `fee_amount` decimal(10,2) NOT NULL,
  `payment_status` varchar(20) NOT NULL,
  `created_at` timestamp
);

CREATE TABLE `report` (
  `report_id` int PRIMARY KEY AUTO_INCREMENT,
  `reporter_id` int NOT NULL,
  `victim_id` int NOT NULL,
  `report_msg` varchar(2000) NOT NULL,
  `created_at` timestamp NOT NULL,
  `report_status` varchar(30) NOT NULL
);

CREATE TABLE `badge` (
  `badge_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) UNIQUE NOT NULL,
  `description` varchar(500),
  `icon` varchar(500)
);

CREATE TABLE `user_badges` (
  `connection_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `badge_id` int NOT NULL,
  `earned_at` timestamp NOT NULL
);

ALTER TABLE `user_socials` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_tag` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_tag` ADD FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`);

ALTER TABLE `drawing` ADD FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `drawing` ADD FOREIGN KEY (`swap_id`) REFERENCES `swap` (`swap_id`);

ALTER TABLE `swap` ADD FOREIGN KEY (`swap_user1`) REFERENCES `user` (`user_id`);

ALTER TABLE `swap` ADD FOREIGN KEY (`swap_user2`) REFERENCES `user` (`user_id`);

ALTER TABLE `message` ADD FOREIGN KEY (`swap_id`) REFERENCES `swap` (`swap_id`);

ALTER TABLE `message` ADD FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `swipe` ADD FOREIGN KEY (`swipe_user1`) REFERENCES `user` (`user_id`);

ALTER TABLE `swipe` ADD FOREIGN KEY (`swipe_user2`) REFERENCES `user` (`user_id`);

ALTER TABLE `swap_rating` ADD FOREIGN KEY (`swap_id`) REFERENCES `swap` (`swap_id`);

ALTER TABLE `swap_rating` ADD FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `swap_rating` ADD FOREIGN KEY (`reviewed_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `auction` ADD FOREIGN KEY (`drawing_id`) REFERENCES `drawing` (`drawing_id`);

ALTER TABLE `bid` ADD FOREIGN KEY (`auc_id`) REFERENCES `auction` (`auc_id`);

ALTER TABLE `bid` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `transaction` ADD FOREIGN KEY (`auc_id`) REFERENCES `auction` (`auc_id`);

ALTER TABLE `transaction` ADD FOREIGN KEY (`winner_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `report` ADD FOREIGN KEY (`reporter_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `report` ADD FOREIGN KEY (`victim_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_badges` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_badges` ADD FOREIGN KEY (`badge_id`) REFERENCES `badge` (`badge_id`);
