<?php
public function storeGender(Request $request)
{
    $validated = $request->validate([
        'gender' => ['required', 'min:3', 'max:30']
    ]);

    Gender::create([
        'gender' => $validated['gender']
    ]);

    return response()->json(['message' => 'Gender Successfully Saved.'], 200);
}

public function getGender($genderId)
{
    $gender = Gender::find($genderId);

    if (!$gender) {
        return response()->json(['message' => 'Gender not found.'], 404);
    }

    return response()->json(['gender' => $gender], 200);
}

public function updateGender(Request $request, Gender $gender)
{
    $validated = $request->validate([
        'gender' => ['required', 'min:3', 'max:30']
    ]);

    $gender->update([
        'gender' => $validated['gender']
    ]);

    return response()->json([
        'gender' => $gender,
        'message' => 'Gender Successfully Updated.'
    ], 200);
}

public function destroyGender(Gender $gender)
{
    $gender->update([
        'is_deleted' => true
    ]);

    return response()->json(['message' => 'Gender Successfully Deleted.'], 200);
}
