<?php

namespace App\Http\Controllers;

use App\Actions\RemoveFileAction;
use App\Actions\UploadFileAction;
use App\Http\Requests\RemoveFileRequest;
use App\Http\Requests\UploadRequest;
use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Class UploadController.
 */
class UploadController extends Controller
{
    /**
     * @param UploadRequest    $request
     * @param UploadFileAction $action
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function store(UploadRequest $request, UploadFileAction $action): JsonResponse
    {
        $filename = $action->execute($request->file("file"), $request->get("session_id"));

        return response()->json([
            'filename' => $filename,
            'path'     => asset("storage/" . $request->get("session_id") . '/' . $filename),
        ]);
    }

    /**
     * @param RemoveFileRequest $request
     * @param RemoveFileAction  $action
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function destroy(RemoveFileRequest $request, RemoveFileAction $action): JsonResponse
    {
        $action->execute($request->get("filename"), $request->get("dirname"));

        return response()->json([]);
    }
}
