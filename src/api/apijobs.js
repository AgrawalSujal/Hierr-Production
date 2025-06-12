import supabaseClient from "../utils/supabase";

// export async function getJobs(token, { location, company_id, searchQuery }) {
//   const supabase = await supabaseClient(token);
//   let query = supabase
//     .from("jobs")
//     .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

//   if (location) {
//     query = query.eq("location", location);
//   }

//   if (company_id) {
//     query = query.eq("company_id", company_id);
//   }

//   if (searchQuery) {
//     query = query.ilike("title", `%${searchQuery}%`);
//   }

//   const { data, error } = await query;

//   if (error) {
//     console.error("Error fetching Jobs:", error);
//     return null;
//   }

//   return data;
// }

// V2
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

  // Enhanced Location Filter
  if (location) {
    // Match either city, full location, or state (like ends with ", Maharashtra")
    query = query.or(
      `location.ilike.%${location}%,location.ilike.%${location}`
    );
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// add remove save job
export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    // If the job is already saved, remove it
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error removing saved job:", deleteError);
      return data;
    }

    return data;
  } else {
    // If the job is not saved, add it to saved jobs
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return data;
    }

    return data;
  }
}

// get single job
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

// get hiring status
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}

export async function getSavedJob(token) {
  const supabase = await supabaseClient(token);

  const { data, error: getSavedJobError } = await supabase
    .from("saved_jobs")
    .select("*,job:jobs(*,company:companies(name,logo_url))");

  if (getSavedJobError) {
    console.error("Error fetching Saved Jobs:", getSavedJobError);
    return null;
  }
  return data;
}

export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);
  if (error) {
    console.error("Error fetching My Jobs:", error);
    return null;
  }
  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}

export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();
  if (error) {
    console.error("Error adding new job:", error);
    return null;
  }
  return data;
}
