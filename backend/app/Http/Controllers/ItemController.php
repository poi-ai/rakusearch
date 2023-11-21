<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        // リクエストから取得するアイテムの件数を指定（デフォルトは10）
        $itemNum = $request->input('itemNum', 10);

        // Itemモデルを使用して指定された件数のレコードを取得
        $items = Item::paginate($itemNum);

        // JSONレスポンスを返す
        return response()->json($items);
    }
}
