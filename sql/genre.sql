-- ジャンル情報を管理するマスターテーブル
CREATE TABLE genres (
    genre_id VARCHAR(6) NOT NULL COMMENT 'ジャンルID',
    genre_name VARCHAR(255) NOT NULL COMMENT 'ジャンル名',
    hierarchy INT NOT NULL COMMENT '階層',
    genre1_id VARCHAR(6) NOT NULL COMMENT '1階層目のジャンルID',
    genre2_id VARCHAR(6) DEFAULT NULL COMMENT '2階層目のジャンルID',
    genre3_id VARCHAR(6) DEFAULT NULL COMMENT '3階層目のジャンルID',
    genre4_id VARCHAR(6) DEFAULT NULL COMMENT '4階層目のジャンルID',
    genre5_id VARCHAR(6) DEFAULT NULL COMMENT '5階層目のジャンルID',
    PRIMARY KEY (genre_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
