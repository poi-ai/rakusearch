<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';

    protected $primaryKey = 'item_code';

    // フィールドの設定
    protected $fillable = [
        'item_code',
        'item_name',
        'item_url',
        'item_price_max',
        'item_price_min',
        'affiliate_url',
        'image_flag',
        'medium_image_url',
        'tax_flag',
        'postage_flag',
        'credit_card_flag',
        'start_time',
        'end_time',
        'review_count',
        'review_average',
        'point_rate',
        'point_rate_start_time',
        'point_rate_end_time',
        'shop_name',
        'shop_code',
        'shop_url',
        'shop_affiliate_url',
    ];

    public $timestamps = true;
}
