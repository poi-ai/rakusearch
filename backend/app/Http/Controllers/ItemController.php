<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        // Itemモデルを使用して上位10レコードを取得
        $items = Item::paginate(10);

        // JSONレスポンスを返す
        return response()->json($items);
    }
}
