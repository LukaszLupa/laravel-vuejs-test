<?php

namespace App\Actions;

use Exception;
use Illuminate\Support\Facades\Storage;

/**
 * Class RemoveFileAction.
 */
class RemoveFileAction
{
    /**
     * @throws Exception
     */
    public function execute(string $filename, string $dirname): void
    {
        if(!Storage::delete($dirname . '/' . $filename)) {
            throw new Exception("Error with removing file.");
        }
    }
}
