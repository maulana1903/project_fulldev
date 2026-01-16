/*
 Navicat Premium Data Transfer

 Source Server         : LOKAL
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : service_online_db

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 14/01/2026 13:06:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache
-- ----------------------------

-- ----------------------------
-- Table structure for cache_locks
-- ----------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache_locks
-- ----------------------------

-- ----------------------------
-- Table structure for client_requests
-- ----------------------------
DROP TABLE IF EXISTS `client_requests`;
CREATE TABLE `client_requests`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_gmaps` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `latitude` decimal(10, 6) NULL DEFAULT NULL,
  `longitude` decimal(10, 6) NULL DEFAULT NULL,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bukti_transfer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of client_requests
-- ----------------------------

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for job_batches
-- ----------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `cancelled_at` int NULL DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job_batches
-- ----------------------------

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED NULL DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `jobs_queue_index`(`queue` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2025_11_11_132250_add_role_to_users_table', 2);
INSERT INTO `migrations` VALUES (5, '2025_11_11_133552_add_role_to_users_table', 2);
INSERT INTO `migrations` VALUES (6, '2025_11_11_145427_create_roles_table', 3);
INSERT INTO `migrations` VALUES (7, '2025_11_11_150215_add_role_id_to_users_table', 4);
INSERT INTO `migrations` VALUES (8, '2025_11_11_155159_create_service_requests_table', 5);
INSERT INTO `migrations` VALUES (9, '2025_11_12_020544_create_client_requests_table', 6);
INSERT INTO `migrations` VALUES (10, '2025_11_12_075922_create_personal_access_tokens_table', 7);
INSERT INTO `migrations` VALUES (11, '2026_01_13_035810_add_is_root_to_users', 8);
INSERT INTO `migrations` VALUES (12, '2026_01_13_041512_add_is_root_to_users1', 9);

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token` ASC) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type` ASC, `tokenable_id` ASC) USING BTREE,
  INDEX `personal_access_tokens_expires_at_index`(`expires_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------
INSERT INTO `personal_access_tokens` VALUES (1, 'App\\Models\\User', 7, 'auth_token', '8a0c675fa2bdf61e7e0e9c2351e5e3b8cf9a505e7f13838d8e5a1556463629c8', '[\"*\"]', NULL, NULL, '2025-11-12 08:46:18', '2025-11-12 08:46:18');
INSERT INTO `personal_access_tokens` VALUES (2, 'App\\Models\\User', 7, 'auth_token', 'db36e9623f973a7832c99e64df47c8ff3fa4c5f5b4c37124cb14a066d26bca14', '[\"*\"]', '2025-11-12 13:18:09', NULL, '2025-11-12 12:37:51', '2025-11-12 13:18:09');
INSERT INTO `personal_access_tokens` VALUES (3, 'App\\Models\\User', 7, 'auth_token', 'cce57393803f9f9ec49a6aee37b0cb324ea4e0ee67c912fb13cac6eb20f5cc8b', '[\"*\"]', '2025-11-12 13:23:13', NULL, '2025-11-12 13:21:03', '2025-11-12 13:23:13');
INSERT INTO `personal_access_tokens` VALUES (4, 'App\\Models\\User', 1, 'auth_token', '7a55c35624b9c2784026dd5c60734061e3ecd7c2c49baed1262fd66c8f40c90a', '[\"*\"]', '2025-11-12 14:16:47', NULL, '2025-11-12 14:13:20', '2025-11-12 14:16:47');
INSERT INTO `personal_access_tokens` VALUES (5, 'App\\Models\\User', 1, 'auth_token', '3e9570251f7a9fdac8ac289e1dcd64b29b8f8fe3938936eeabce50cb962baf56', '[\"*\"]', '2025-11-13 10:18:12', NULL, '2025-11-13 10:15:51', '2025-11-13 10:18:12');
INSERT INTO `personal_access_tokens` VALUES (6, 'App\\Models\\User', 1, 'auth_token', '50768058ff9d71928f9fa16ccbd83ad5b84d8bdd9dacf72eeb661acd67bc5bf5', '[\"*\"]', '2025-11-13 11:36:36', NULL, '2025-11-13 11:27:49', '2025-11-13 11:36:36');
INSERT INTO `personal_access_tokens` VALUES (7, 'App\\Models\\User', 1, 'auth_token', '9e674e4d84e7ee20d22e45e1977e8612009fca085925e29a0dd55ad3feed8e6a', '[\"*\"]', '2025-11-13 12:16:15', NULL, '2025-11-13 12:04:43', '2025-11-13 12:16:15');
INSERT INTO `personal_access_tokens` VALUES (8, 'App\\Models\\User', 1, 'auth_token', '8b1b21037f0210050860c5245b72aa058188af5aea660393583ea0120b005238', '[\"*\"]', '2025-12-18 06:19:59', NULL, '2025-12-18 06:19:18', '2025-12-18 06:19:59');
INSERT INTO `personal_access_tokens` VALUES (9, 'App\\Models\\User', 1, 'auth_token', 'f982be5cc221882f71809702968d089fdfc652270283067dad0b9b33c5bd19cc', '[\"*\"]', NULL, NULL, '2025-12-28 12:23:48', '2025-12-28 12:23:48');
INSERT INTO `personal_access_tokens` VALUES (10, 'App\\Models\\User', 1, 'auth_token', 'c71c14d6ffb71f0954818f5ddb96b0948d87c0fc3aa8cb26c083c5391f70ff46', '[\"*\"]', '2025-12-28 12:24:05', NULL, '2025-12-28 12:23:51', '2025-12-28 12:24:05');
INSERT INTO `personal_access_tokens` VALUES (11, 'App\\Models\\User', 1, 'auth_token', 'f000c36016d78fbf4f4da28ce6b49ec3e17eb9aa3d884d18c458793f4ba82c16', '[\"*\"]', NULL, NULL, '2025-12-28 12:23:59', '2025-12-28 12:23:59');
INSERT INTO `personal_access_tokens` VALUES (12, 'App\\Models\\User', 1, 'auth_token', '10f7ac582d8e80f6b5ff06c3edca004d9d7960003c6ee6c1a1ed73c82b67a503', '[\"*\"]', NULL, NULL, '2025-12-28 12:24:01', '2025-12-28 12:24:01');
INSERT INTO `personal_access_tokens` VALUES (13, 'App\\Models\\User', 1, 'auth_token', '6944b451038de36e077af66cb92be0984d220e6056a2e3ca810150baf071e464', '[\"*\"]', NULL, NULL, '2025-12-28 12:24:02', '2025-12-28 12:24:02');
INSERT INTO `personal_access_tokens` VALUES (14, 'App\\Models\\User', 7, 'auth_token', '49cce5bc19384b2c7d0133b1189d363d64b4c6cc3429e40235c0ac2526a91d56', '[\"*\"]', '2025-12-28 13:03:30', NULL, '2025-12-28 13:03:24', '2025-12-28 13:03:30');
INSERT INTO `personal_access_tokens` VALUES (15, 'App\\Models\\User', 7, 'auth_token', 'dc8300e7f293f5420332f149d20770b6acebcb975342d634c77d9cebdef1d9c0', '[\"*\"]', '2025-12-28 13:03:46', NULL, '2025-12-28 13:03:26', '2025-12-28 13:03:46');
INSERT INTO `personal_access_tokens` VALUES (16, 'App\\Models\\User', 7, 'auth_token', '1132b12fb1687d775315cc9080fb3cb2476ff9da85fac8fbbe67e88f3bf1f64a', '[\"*\"]', '2026-01-08 10:45:44', NULL, '2026-01-08 10:32:50', '2026-01-08 10:45:44');
INSERT INTO `personal_access_tokens` VALUES (17, 'App\\Models\\User', 1, 'auth_token', '7092102955321c693ba3cfea87efaa1478b9fed478729d004e6003c560dc3dfa', '[\"*\"]', '2026-01-08 10:46:42', NULL, '2026-01-08 10:46:37', '2026-01-08 10:46:42');
INSERT INTO `personal_access_tokens` VALUES (18, 'App\\Models\\User', 1, 'auth_token', '965f666658eabcf5cfff24dd5a97c3efb43cc217921c617f85cfcfee4f0641d8', '[\"*\"]', '2026-01-14 05:59:04', NULL, '2026-01-08 10:46:40', '2026-01-14 05:59:04');
INSERT INTO `personal_access_tokens` VALUES (19, 'App\\Models\\User', 7, 'auth_token', 'b2028d68e782933c3f293c1938fb171969c88ba8129d41f013792bea6b2a9331', '[\"*\"]', '2026-01-11 10:50:38', NULL, '2026-01-11 10:50:31', '2026-01-11 10:50:38');
INSERT INTO `personal_access_tokens` VALUES (20, 'App\\Models\\User', 7, 'auth_token', '387a42343a7a1c30e16508f7f4b590b239d472fba8f1ebb88eb5a2530b9f85e0', '[\"*\"]', NULL, NULL, '2026-01-11 10:50:34', '2026-01-11 10:50:34');
INSERT INTO `personal_access_tokens` VALUES (21, 'App\\Models\\User', 7, 'auth_token', '9215bb8a28785acb37cd8889460c37e01a45eaa049db87fd9a1143f54c280dee', '[\"*\"]', NULL, NULL, '2026-01-11 10:50:35', '2026-01-11 10:50:35');
INSERT INTO `personal_access_tokens` VALUES (22, 'App\\Models\\User', 7, 'auth_token', 'fe82819b5d2f9ef5ea592d912be222faa3fc4106627c182e052633a00438df4d', '[\"*\"]', '2026-01-11 11:05:10', NULL, '2026-01-11 10:50:36', '2026-01-11 11:05:10');
INSERT INTO `personal_access_tokens` VALUES (23, 'App\\Models\\User', 7, 'auth_token', '41cb2669b3d6a216696b9aa1b03c753ef02865eae8d1b8a8a8eba0120ba44f5f', '[\"*\"]', NULL, NULL, '2026-01-11 11:58:03', '2026-01-11 11:58:03');
INSERT INTO `personal_access_tokens` VALUES (24, 'App\\Models\\User', 7, 'auth_token', 'f64df11104d0b8492bf6921321631100a61b9549eb9334e0607143897b64c9b8', '[\"*\"]', NULL, NULL, '2026-01-11 12:07:05', '2026-01-11 12:07:05');
INSERT INTO `personal_access_tokens` VALUES (25, 'App\\Models\\User', 7, 'auth_token', '9da9b75364c9e5d0e8a58c369881b03bce5039b75b2a5c43ca2c6ae430df7220', '[\"*\"]', NULL, NULL, '2026-01-11 12:07:08', '2026-01-11 12:07:08');
INSERT INTO `personal_access_tokens` VALUES (26, 'App\\Models\\User', 7, 'auth_token', 'ecd5f67a2cd4a5a328048da092f5d25cac69ae1bb6dcaf4b75ebd15ca77d1876', '[\"*\"]', '2026-01-11 12:14:06', NULL, '2026-01-11 12:12:36', '2026-01-11 12:14:06');
INSERT INTO `personal_access_tokens` VALUES (27, 'App\\Models\\User', 7, 'auth_token', 'e0ebc3bfcd968b201278147f2093a57e1f12f5a0fcac5a114d21baef6543128d', '[\"*\"]', NULL, NULL, '2026-01-11 12:14:03', '2026-01-11 12:14:03');
INSERT INTO `personal_access_tokens` VALUES (28, 'App\\Models\\User', 7, 'auth_token', '76f7b4c9e12df4483cd1676d4dbe1031fd62a1d567fcf850e298df1750e6b7ee', '[\"*\"]', NULL, NULL, '2026-01-11 12:14:53', '2026-01-11 12:14:53');
INSERT INTO `personal_access_tokens` VALUES (29, 'App\\Models\\User', 7, 'auth_token', 'fde502d2b8014c5dc0918d2661f28be6cde194d142d595fda489c788d5432b39', '[\"*\"]', '2026-01-11 12:46:30', NULL, '2026-01-11 12:15:33', '2026-01-11 12:46:30');
INSERT INTO `personal_access_tokens` VALUES (30, 'App\\Models\\User', 7, 'auth_token', 'b2ac7c360c9b07e10f54229439721ddb5692d48f3ea4ccca2ae63d38fa4b02ad', '[\"*\"]', NULL, NULL, '2026-01-11 12:27:13', '2026-01-11 12:27:13');
INSERT INTO `personal_access_tokens` VALUES (31, 'App\\Models\\User', 7, 'auth_token', 'ae6407e66a6973b10845069b9058d6249efd839187bb0dea0812943f806fee70', '[\"*\"]', '2026-01-11 12:54:50', NULL, '2026-01-11 12:47:08', '2026-01-11 12:54:50');
INSERT INTO `personal_access_tokens` VALUES (32, 'App\\Models\\User', 7, 'auth_token', '9d1f30b77b53115bf78eacd4dffe5c28a575c876857bde5c1f4fb5fbc2119b03', '[\"*\"]', '2026-01-12 03:07:42', NULL, '2026-01-12 02:03:53', '2026-01-12 03:07:42');
INSERT INTO `personal_access_tokens` VALUES (33, 'App\\Models\\User', 1, 'auth_token', '64f741c571a90528f6a0696e4bfb19a7a46eaeb66da20f8d79648b4f083f793a', '[\"*\"]', '2026-01-12 04:32:35', NULL, '2026-01-12 04:32:31', '2026-01-12 04:32:35');
INSERT INTO `personal_access_tokens` VALUES (34, 'App\\Models\\User', 1, 'auth_token', 'ea28bd5ba98e3beefbf87459904430d7a3bed3998a6b7eee95dde5b8060e20d3', '[\"*\"]', '2026-01-13 03:00:35', NULL, '2026-01-13 02:37:48', '2026-01-13 03:00:35');
INSERT INTO `personal_access_tokens` VALUES (35, 'App\\Models\\User', 7, 'auth_token', '448bf378994709b6d60092d0453119d239e51e7dadd14b1c05d34939ad5ef6a9', '[\"*\"]', '2026-01-13 03:21:10', NULL, '2026-01-13 03:01:31', '2026-01-13 03:21:10');
INSERT INTO `personal_access_tokens` VALUES (36, 'App\\Models\\User', 1, 'auth_token', '6ba2880de56cad1a547d3b750a3d092a81781b3b9e9e3c5fca4a3e18ac842c9c', '[\"*\"]', '2026-01-13 03:47:44', NULL, '2026-01-13 03:03:21', '2026-01-13 03:47:44');
INSERT INTO `personal_access_tokens` VALUES (37, 'App\\Models\\User', 1, 'auth_token', '86f395c6abb9250b533ec6e8354c0a2b7ec2bdba3ff305952555f376de5bc011', '[\"*\"]', '2026-01-13 03:47:56', NULL, '2026-01-13 03:47:53', '2026-01-13 03:47:56');
INSERT INTO `personal_access_tokens` VALUES (38, 'App\\Models\\User', 1, 'auth_token', 'b202c572b284b6f6537c6af3d15c91bf2c8657231b000359e66c598e30a54a41', '[\"*\"]', '2026-01-13 04:41:36', NULL, '2026-01-13 03:49:32', '2026-01-13 04:41:36');
INSERT INTO `personal_access_tokens` VALUES (39, 'App\\Models\\User', 1, 'auth_token', '0cfd225e5d9dee18c51de06465e844d43a3bde12be55aa1d9be962e123bdf0e8', '[\"*\"]', '2026-01-13 04:57:23', NULL, '2026-01-13 04:41:49', '2026-01-13 04:57:23');
INSERT INTO `personal_access_tokens` VALUES (40, 'App\\Models\\User', 1, 'auth_token', '1640ded7ec373c34c1138b27becde9bd331fd090ce967c4ad3ed939f33ebeb4c', '[\"*\"]', '2026-01-13 05:05:43', NULL, '2026-01-13 04:57:32', '2026-01-13 05:05:43');
INSERT INTO `personal_access_tokens` VALUES (41, 'App\\Models\\User', 1, 'auth_token', '5cc5d77ddadb27c956e302c1b541adf3ea976b91f6b73fabf3cd1d496dba00de', '[\"*\"]', '2026-01-13 05:06:31', NULL, '2026-01-13 05:05:54', '2026-01-13 05:06:31');
INSERT INTO `personal_access_tokens` VALUES (42, 'App\\Models\\User', 14, 'auth_token', 'b6c7920639b8630f8df63902ce175f65633643be53b29292e6c147a8744b6dcf', '[\"*\"]', '2026-01-13 05:29:27', NULL, '2026-01-13 05:06:44', '2026-01-13 05:29:27');
INSERT INTO `personal_access_tokens` VALUES (43, 'App\\Models\\User', 14, 'auth_token', '0450ea687ed4722306e6b5fac617fe402d922608c0861ba18906a363094f95c6', '[\"*\"]', '2026-01-13 06:32:15', NULL, '2026-01-13 05:41:50', '2026-01-13 06:32:15');
INSERT INTO `personal_access_tokens` VALUES (44, 'App\\Models\\User', 14, 'auth_token', '28dc84a8ee7e5ea18a64a9812eba1ee9825a3c1471aa576bd737b40f529103a4', '[\"*\"]', '2026-01-13 06:32:55', NULL, '2026-01-13 06:32:22', '2026-01-13 06:32:55');
INSERT INTO `personal_access_tokens` VALUES (45, 'App\\Models\\User', 1, 'auth_token', '73c706d7ab1b9ed64ad3307a83372a72b44a71f2a0300b9ffaab3211c4cd60e8', '[\"*\"]', '2026-01-13 11:44:56', NULL, '2026-01-13 11:44:35', '2026-01-13 11:44:56');
INSERT INTO `personal_access_tokens` VALUES (46, 'App\\Models\\User', 1, 'auth_token', '669cee247027b09ffbd310848f6bb92f465e210d162705a570be3737396d179b', '[\"*\"]', NULL, NULL, '2026-01-13 11:44:43', '2026-01-13 11:44:43');
INSERT INTO `personal_access_tokens` VALUES (47, 'App\\Models\\User', 1, 'auth_token', 'ac839e59009c91ce9c4e2abd630f7465eb50d7eb45e008d08ac87ab24c3e44a5', '[\"*\"]', '2026-01-13 13:04:15', NULL, '2026-01-13 11:44:49', '2026-01-13 13:04:15');
INSERT INTO `personal_access_tokens` VALUES (48, 'App\\Models\\User', 1, 'auth_token', 'fda6c8b175f3b89cb62de8f400f6f5a356f1024b4f86713ba40c9bf476d2b5df', '[\"*\"]', '2026-01-13 13:11:37', NULL, '2026-01-13 13:11:31', '2026-01-13 13:11:37');
INSERT INTO `personal_access_tokens` VALUES (49, 'App\\Models\\User', 1, 'auth_token', 'a03e66e42879678f69bab7f02fedfe25985838d8f192ed78cf19c0edf2cd4531', '[\"*\"]', '2026-01-13 13:59:01', NULL, '2026-01-13 13:11:35', '2026-01-13 13:59:01');
INSERT INTO `personal_access_tokens` VALUES (50, 'App\\Models\\User', 7, 'auth_token', '551c0bbb04e99f464fba83d54f88dc1a7a7fa367a21af27e84eeaa1c4791ce86', '[\"*\"]', '2026-01-13 14:07:26', NULL, '2026-01-13 14:06:35', '2026-01-13 14:07:26');
INSERT INTO `personal_access_tokens` VALUES (51, 'App\\Models\\User', 1, 'auth_token', '19af96657d14204c7cc15163a4d437a97e2390eef23e980f382b1990c00151ee', '[\"*\"]', '2026-01-13 14:20:12', NULL, '2026-01-13 14:08:08', '2026-01-13 14:20:12');
INSERT INTO `personal_access_tokens` VALUES (52, 'App\\Models\\User', 7, 'auth_token', '019462d2cb2c42d342ce088ce20fb9e80a4477260b26f5bf1a226bd80103d625', '[\"*\"]', '2026-01-13 14:24:09', NULL, '2026-01-13 14:20:30', '2026-01-13 14:24:09');
INSERT INTO `personal_access_tokens` VALUES (53, 'App\\Models\\User', 1, 'auth_token', 'e4954e03f791c54e9e1c66ed7bda5c09900e0555979b2765536b98639cc6c4b9', '[\"*\"]', '2026-01-13 14:25:04', NULL, '2026-01-13 14:24:24', '2026-01-13 14:25:04');
INSERT INTO `personal_access_tokens` VALUES (54, 'App\\Models\\User', 1, 'auth_token', '00fdc05a4b4fd32ff22d357e49feee9658bbe2f578addff513e6e841527d1d5f', '[\"*\"]', NULL, NULL, '2026-01-14 05:58:55', '2026-01-14 05:58:55');
INSERT INTO `personal_access_tokens` VALUES (55, 'App\\Models\\User', 1, 'auth_token', '0e44fb404d7959ff77452e7102a621461de31e08855b6535ccc6a80993e10be3', '[\"*\"]', NULL, NULL, '2026-01-14 05:58:59', '2026-01-14 05:58:59');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'superuser', '2025-11-11 14:57:52', '2025-11-11 14:57:52');
INSERT INTO `roles` VALUES (2, 'admin', '2025-11-11 14:58:02', '2025-11-11 14:58:02');

-- ----------------------------
-- Table structure for service_requests
-- ----------------------------
DROP TABLE IF EXISTS `service_requests`;
CREATE TABLE `service_requests`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nama_pemilik` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_telp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_gmaps` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10, 7) NULL DEFAULT NULL,
  `longitude` decimal(10, 7) NULL DEFAULT NULL,
  `tanggal_service` date NOT NULL,
  `jam_service` time NOT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bukti_transfer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('menunggu','disetujui','ditolak') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'menunggu',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of service_requests
-- ----------------------------
INSERT INTO `service_requests` VALUES (1, 'bla bla bla', '85868598956', 'lkjjdlfajldfjoa', 'https://www.google.com/maps/@-7.7126798,110.7441126,17.81z?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D', -7.7122403, 110.7431521, '2025-11-21', '13:40:00', 'rusak total', 'bukti_transfer/U28prGCxis4g06gT9HGpFC7mZmZ95x2hMzIxZPUw.png', 'disetujui', '2025-11-12 02:43:17', '2026-01-12 03:07:40');
INSERT INTO `service_requests` VALUES (2, 'ujicoba', '6285868598956', 'jakarta', 'https://www.google.com/maps/@-7.7255013,110.7480065,15z?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D', -7.7096950, 110.7150650, '2025-11-21', '12:37:00', 'rusak total', 'bukti_transfer/ABTFTJ5gNf09SxEIrzgebk2E2NgLsqZDiKrFk3qS.png', 'disetujui', '2025-11-12 05:36:37', '2026-01-12 03:07:24');
INSERT INTO `service_requests` VALUES (3, 'Fatwa Imam Maulana', '220103232', 'Karangdowo, Klaten', 'https://maps.google.com/?q=-7.123,110.123', -7.1230000, 110.1230000, '2025-11-13', '07:07:00', 'Ngga Jadi rusak', 'bukti_transfer/WDDRBcKyFIw3ht3lqCdsLAjfELuKzPcshGejiylF.png', 'disetujui', '2025-11-12 12:35:55', '2025-11-12 13:23:13');
INSERT INTO `service_requests` VALUES (4, 'Tester', '220103232', 'Karangdowo, Klaten', 'https://maps.google.com/?q=-7.123,110.123', -7.1230000, 110.1230000, '2025-11-17', '07:10:00', 'Ngga Jadi rusak', 'bukti_transfer/CmqJbyX6p50lyr0zVjBsLEnp054zdJbDiYBPz1Nr.png', 'disetujui', '2025-11-13 11:30:30', '2025-11-13 11:36:36');
INSERT INTO `service_requests` VALUES (5, 'Uji Coba', '85868598956', 'Ujicoba', 'https://maps.google.com/?q=-7.123,110.123', -7.1230000, 110.1230000, '2025-11-18', '07:15:00', 'Mati Total', 'bukti_transfer/uL5NoH6ldg47QCIt7EficrVszFnbSrTi3UKX2rvp.png', 'ditolak', '2025-11-13 12:22:54', '2026-01-12 02:23:02');
INSERT INTO `service_requests` VALUES (6, 'Fatwa Imam Maulana', '085868598956', 'Kasihan Rt15', 'https://www.google.com/maps?q=-7.715138045038896,110.73257446289064', -7.7151380, 110.7325745, '2025-12-24', '14:03:00', 'wkwkwk', 'bukti_transfer/MyUuzcav2qRcvIMXokYvBcgsAheDH1X4EVXzBAjt.png', 'ditolak', '2025-12-28 12:04:04', '2025-12-28 13:03:41');
INSERT INTO `service_requests` VALUES (7, 'Aris', '00000000000000', 'Ujicoba', 'https://www.google.com/maps?q=-7.68288417711879,110.84052801132202', -7.6828842, 110.8405280, '2026-01-09', '12:33:00', 'Rusak', 'bukti_transfer/ljfwHB5NtqwjYu6w6cUPzPxYLQ554P2Il7QZYFnS.jpg', 'menunggu', '2026-01-08 10:31:48', '2026-01-08 10:31:48');
INSERT INTO `service_requests` VALUES (8, 'Aris', '00000000000000', 'Ujicoba', 'https://www.google.com/maps?q=-7.68288417711879,110.84052801132202', -7.6828842, 110.8405280, '2026-01-09', '12:33:00', 'Rusak', 'bukti_transfer/KCYVeNDiU46a0ng35kS3aBw1zXoWnLMpypMYcFMc.jpg', 'ditolak', '2026-01-08 10:31:53', '2026-01-13 14:24:07');
INSERT INTO `service_requests` VALUES (9, 'unit', '85868598956', 'kjhdkfhaiuehifk', 'https://www.google.com/maps?q=-7.743954328597888,110.69841384887697', -7.7439543, 110.6984138, '2026-01-06', '13:10:00', 'asndjasdk', 'bukti_transfer/tQ2mAfiMrWQ3tVwWw4W1DL4q4vMOqjz20qb4qjHr.png', 'ditolak', '2026-01-08 11:11:02', '2026-01-13 14:06:50');
INSERT INTO `service_requests` VALUES (10, 'unit', '85868598956', 'kjhdkfhaiuehifk', 'https://www.google.com/maps?q=-7.743954328597888,110.69841384887697', -7.7439543, 110.6984138, '2026-01-06', '13:10:00', 'asndjasdk', 'bukti_transfer/uSFJgaFLUhJthgqn2mVqWFgXg2EKJd80GKvSyVAe.png', 'disetujui', '2026-01-08 11:11:05', '2026-01-12 02:34:28');
INSERT INTO `service_requests` VALUES (11, 'Haloo', '85868598956', 'Karangdowo', 'https://www.google.com/maps?q=-7.629352692434759,110.84243774414064', -7.6293527, 110.8424377, '2026-12-01', '14:23:00', 'Eror', 'bukti_transfer/Rryq9hsvbxPFMB7Xini8YwEOYASJFDRa1lCjntZH.png', 'disetujui', '2026-01-11 10:20:57', '2026-01-12 02:30:56');
INSERT INTO `service_requests` VALUES (12, 'Haloo', '85868598956', 'Karangdowo', 'https://www.google.com/maps?q=-7.629352692434759,110.84243774414064', -7.6293527, 110.8424377, '2026-12-01', '14:23:00', 'Eror', 'bukti_transfer/xWX0o7NHGTSqdAQo7ZqRx3sZMUgpaC4hqr0JKRRX.png', 'disetujui', '2026-01-11 10:21:03', '2026-01-12 02:30:00');
INSERT INTO `service_requests` VALUES (13, 'Haloo', '85868598956', 'Karangdowo', 'https://www.google.com/maps?q=-7.629352692434759,110.84243774414064', -7.6293527, 110.8424377, '2026-12-01', '14:23:00', 'Eror', 'bukti_transfer/kUABCHRkEt3p1NSRZTdRtOy7lm5ofpPnYUeYOE9F.png', 'ditolak', '2026-01-11 10:21:04', '2026-01-12 02:27:22');
INSERT INTO `service_requests` VALUES (14, 'Haloo', '85868598956', 'Karangdowo', 'https://www.google.com/maps?q=-7.629352692434759,110.84243774414064', -7.6293527, 110.8424377, '2026-12-01', '14:23:00', 'Eror', 'bukti_transfer/jODQQlMyomG3vNBuy0D2FY1GpS1ViLcACqj9NMMf.png', 'ditolak', '2026-01-11 10:21:05', '2026-01-12 02:23:18');
INSERT INTO `service_requests` VALUES (15, 'Haloo', '85868598956', 'Karangdowo', 'https://www.google.com/maps?q=-7.629352692434759,110.84243774414064', -7.6293527, 110.8424377, '2026-12-01', '14:23:00', 'Eror', 'bukti_transfer/uP3Umf6nHIOkMZDNtSMVSqPMvq6nzISTco7XAyvN.png', 'ditolak', '2026-01-11 10:21:06', '2026-01-12 02:22:53');
INSERT INTO `service_requests` VALUES (16, 'Haloo', '85868598956', 'Karangdowo', 'https://www.google.com/maps?q=-7.629352692434759,110.84243774414064', -7.6293527, 110.8424377, '2026-12-01', '14:23:00', 'Eror', 'bukti_transfer/8vVRouvGN3rp3dO5iZOcr7DmroLJhc8gJGI8uYFs.png', 'ditolak', '2026-01-11 10:21:07', '2026-01-12 02:10:38');
INSERT INTO `service_requests` VALUES (17, 'Haloo', '85868598956', 'Karangdowo', 'https://www.google.com/maps?q=-7.629352692434759,110.84243774414064', -7.6293527, 110.8424377, '2026-12-01', '14:23:00', 'Eror', 'bukti_transfer/1rJtWVKHG7vXY065Yx3dMzO1Nvqnjm9NUZmDBW2g.png', 'ditolak', '2026-01-11 10:21:07', '2026-01-12 02:20:42');
INSERT INTO `service_requests` VALUES (18, 'Haloo H', '85868598956', 'Karangdowo', 'https://www.google.com/maps?q=-7.740260043250391,110.88363647460939', -7.7402600, 110.8836365, '2025-12-12', '12:22:00', 'Haloo Rusak Bos', 'bukti_transfer/GpA4iS6Vt51FxharTcXmobaadaJN739SwbQY2lzb.png', 'disetujui', '2026-01-11 10:21:58', '2026-01-11 12:46:29');
INSERT INTO `service_requests` VALUES (19, 'Kudoikom_Store', '85868598956', 'Kasihan, RT 15 Rw06, Tambak Karangdowo, Klaten', 'https://www.google.com/maps?q=-7.649078048813627,110.77720642089845', -7.6490780, 110.7772064, '2026-01-18', '12:32:00', 'Mbuh', 'bukti_transfer/cHJk4Ikvp4oWGCjncYypJYInu9dP6scaS5kvqDct.png', 'ditolak', '2026-01-11 10:36:16', '2026-01-11 12:13:46');
INSERT INTO `service_requests` VALUES (20, 'Haloo', '85641496254', 'Haloo', 'https://www.google.com/maps?q=-7.723930382834864,110.80741882324219', -7.7239304, 110.8074188, '2026-01-14', '14:07:00', 'Haloo', 'bukti_transfer/SyVmBiZyU0Ocxg1Ky7j9hVUhGRnCquk3omW4n21j.png', 'disetujui', '2026-01-13 14:06:06', '2026-01-13 14:07:23');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NULL DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sessions_user_id_index`(`user_id` ASC) USING BTREE,
  INDEX `sessions_last_activity_index`(`last_activity` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('0dAZn6OWOR86gXwLwoq9Ag8wIcG3VpXmioG2vERL', 7, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNWh2VHpoNkZiZzdXVVFyZTBuWnRrSG1hdXFWU3p3cmRRVW9tNW5uRiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlLXJlcXVlc3QiO3M6NToicm91dGUiO3M6MTE6ImNsaWVudC5mb3JtIjt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Nzt9', 1762933585);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` bigint UNSIGNED NULL DEFAULT NULL,
  `is_root` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `jabatan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 1, 1, 'Fatwa I.M', 'fatwaimam.fim@gmail.com', NULL, '$2y$12$bRF8QSToL21YUlYAx0AzZeGHBwJOEZjgrnnNhJ1eFsZQkNZmdcDXe', NULL, '2025-11-11 13:43:59', '2026-01-13 14:08:26', 'SuperAdmin', 'Kepala IT');
INSERT INTO `users` VALUES (7, 2, 0, 'Admin pertama', 'admin1@mail.com', NULL, '$2y$12$Vwcq1KcS8suHV5/aDqBPAevMr9TbR47vb9WB0IOyFuWUmqq85hQL6', NULL, '2025-11-12 07:41:42', '2025-11-12 07:42:00', 'admin', 'admin1');
INSERT INTO `users` VALUES (9, 1, 0, 'Admin KE2', 'admin2@mail.com', NULL, '$2y$12$1PntPVLvMuEEKnTY/7mFUugb5nJdgjgIZnB/qR957SPA8YjPFRzim', NULL, '2025-11-13 10:16:54', '2026-01-13 14:09:08', 'SuperAdmin', 'admin2');
INSERT INTO `users` VALUES (14, 1, 0, 'Favian', 'favicon@mail.com', NULL, '$2y$12$OB938k6vw6rOfmd5Sl7usedprFylomF0AmAD2H5Y5mQKU0aj0bvQ6', NULL, '2026-01-13 05:06:27', '2026-01-13 05:06:27', 'SuperAdmin', 'IT');
INSERT INTO `users` VALUES (16, 1, 0, 'Aris', 'arisan@mail.com', NULL, '$2y$12$iLuP89lRUdpaQG5jPmgf3O32DRYX5SGVqXJX59v13rnj3Y6bslqEu', NULL, '2026-01-13 11:58:25', '2026-01-13 11:58:25', 'admin', 'IT Service');

SET FOREIGN_KEY_CHECKS = 1;
