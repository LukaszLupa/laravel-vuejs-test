<?php

namespace App\Actions;

use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Class UploadFileAction.
 */
class UploadFileAction
{
    /**
     * @throws Exception
     */
    public function execute(UploadedFile $file, string $sessionId): string
    {
        $filename = Str::upper(Str::random(30)) . '.' . $file->getClientOriginalExtension();

        if(!Storage::putFileAs($sessionId, $file, $filename)) {
            throw new Exception("Error with file upload.");
        }

        return $filename;
    }
}
