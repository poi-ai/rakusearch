<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    public function index()
    {
        // Itemモデルを使用して上位20レコードを取得
        $items = DB::select('SELECT * FROM items');

        // JSONレスポンスを返す
        return response()->json($items);
    }
}
